---
layout: post
comments: true
giscus_comments: true
title: Dead Simple Network Failover (Ubuntu)
date: 2025-09-29 08:00:00
description: Simple automatic failover when you have two ISPs
---

Got two ISPs? Want automatic failover when one dies? Here's a zero-dependency solution that just works on Ubuntu (or any systemd/NetworkManager distro).

## The Problem

I have cable and Starlink. Cable is OK-ish but occasionally goes down. Starlink is my backup. I wanted automatic failover without buying expensive hardware or running complex software.

## The Solution

A simple bash script that:

- Checks if primary connection is healthy every 3 seconds
- Switches to backup after 3 consecutive failures
- Switches back when primary is stable again
- Prevents flapping between connections

## Setup (5 minutes)

### 1. Find your network interfaces

```bash
ip link show  # Find your interface names
```

### 2. Create the failover script

Save this to `/usr/local/bin/netfailover.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Configuration - CHANGE THESE!
PRIMARY_IF="eth0"           # Your primary ISP interface
BACKUP_IF="wlan0"          # Your backup ISP interface
PRIMARY_NAME="Primary"      # Display name
BACKUP_NAME="Backup"       # Display name

# Tuning
OK_THRESHOLD=3             # Checks before switching back
FAIL_THRESHOLD=3           # Failures before switching
SLEEP_SECS=3              # Check interval

require_root(){ [[ $EUID -eq 0 ]] || { echo "Run with sudo"; exit 1; }; }
log(){ logger -t netfailover "$1"; echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }
gw(){ nmcli -g IP4.GATEWAY device show "$1" 2>/dev/null || true; }
setdef(){
  local ifc=$1 gw=$2
  [[ -n "$gw" ]] && ip route replace default via "$gw" dev "$ifc" && return 0
  return 1
}

healthy(){
  local ok=0
  # Test multiple endpoints to avoid false positives
  for dst in 1.1.1.1 8.8.8.8 9.9.9.9; do
    ping -I "$PRIMARY_IF" -c 1 -W 1 "$dst" >/dev/null 2>&1 && ok=$((ok+1))
  done
  [[ $ok -ge 2 ]]  # Need 2/3 responding
}

# Main loop
require_root
cur_primary=1; fail=0; ok=0

log "Starting failover monitor ($PRIMARY_NAME ↔ $BACKUP_NAME)"

while true; do
  PGW=$(gw "$PRIMARY_IF")
  BGW=$(gw "$BACKUP_IF")

  if healthy; then
    ok=$((ok+1)); fail=0
    if (( cur_primary==0 && ok>=OK_THRESHOLD )); then
      log "✓ $PRIMARY_NAME healthy → switching back"
      setdef "$PRIMARY_IF" "$PGW" && cur_primary=1
      ok=0
    fi
  else
    fail=$((fail+1)); ok=0
    if (( cur_primary==1 && fail>=FAIL_THRESHOLD )); then
      log "✗ $PRIMARY_NAME failed → switching to $BACKUP_NAME"
      setdef "$BACKUP_IF" "$BGW" && cur_primary=0
      fail=0
    fi
  fi

  sleep "$SLEEP_SECS"
done
```

### 3. Create the systemd service

Save this to `/etc/systemd/system/netfailover.service`:

```ini
[Unit]
Description=Network Failover Service
After=network-online.target NetworkManager-wait-online.service
Wants=network-online.target NetworkManager-wait-online.service

[Service]
Type=simple
ExecStartPre=/bin/sleep 8
ExecStart=/usr/local/bin/netfailover.sh
Restart=always
RestartSec=2
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

### 4. Enable and start

```bash
sudo chmod +x /usr/local/bin/netfailover.sh
sudo systemctl daemon-reload
sudo systemctl enable netfailover.service
sudo systemctl start netfailover.service
```

### 5. Check it's working

```bash
# Watch the logs
sudo journalctl -u netfailover -f

# Test failover (unplug primary cable or disable interface)
sudo ip link set eth0 down  # Wait ~10 seconds
sudo ip link set eth0 up    # Should switch back after ~10 seconds
```

## How It Works

1. **Health checks**: Pings 3 public DNS servers through the primary interface
2. **Smart thresholds**: Requires 3 consecutive failures before switching (prevents false positives)
3. **Stable switching**: Waits for 3 successful checks before switching back (prevents flapping)
4. **Route manipulation**: Uses Linux's default route to control which ISP handles traffic

## Why This Approach?

- **No dependencies**: Just bash, ping, and ip route
- **Simple**: ~50 lines of code you can understand and modify
- **Battle-tested**: Based on traditional network monitoring patterns
- **Fast**: Detects failures in ~9 seconds, recovers in ~9 seconds

## Gotchas

- Both connections need to be up and have DHCP leases
- Existing connections may drop during switchover
- DNS might need a flush after switching: `systemd-resolve --flush-caches`

## Monitoring

Check which connection is active:

```bash
ip route | grep default
```

View failover logs:

```bash
sudo journalctl -u netfailover --since "1 hour ago"
```

---

That's it. No BGP, no VRRP, no expensive hardware. Just a simple script that keeps me online.

Tested on Ubuntu 22.04/24.04 with cable + starlink, and dual WAN setups. Should work on any Linux with NetworkManager and systemd.
