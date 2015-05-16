#!/usr/bin/env bash

cd /vagrant
npm install
./node_modules/bower/bin/bower install
./node_modules/grunt-cli/bin/grunt default
