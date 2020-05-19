#!/usr/bin/env bash

# Docker volumes are mounted as root:root by default, so we have to fix permissions on them
sudo chown -R $(id -u):$(id -g) /var/www/cms/vendor || true
sudo chown -R $(id -u):$(id -g) /var/www/frontend/node_modules || true
sudo chown -R $(id -u):$(id -g) /var/www/frontend/.cache  || true
