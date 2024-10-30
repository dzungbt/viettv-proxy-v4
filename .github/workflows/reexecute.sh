#!/bin/bash

ports=(
  3010
  3020
  3030
  4010
  4020
  4030
  5010
  5020
  5030
)

processes=(
  "proxy_eu_1"
  "proxy_eu_2"
  "proxy_eu_3"
  "proxy_sg_1"
  "proxy_sg_2"
  "proxy_sg_3"

)

for port in "${ports[@]}"
do
  echo "Finding processes running on port $port..."
  pids=$(lsof -i :$port | awk '$1 == "node" {print $2}')

  if [ -n "$pids" ]; then
    echo "Stopping processes with PIDs: $pids"
    echo "$pids" | xargs kill -9
    echo "All processes on port $port have been stopped"
  else
    echo "No processes found running on port $port"
  fi
done

for process in "${processes[@]}"
do
  pid_file="/www/server/nodejs/vhost/pids/${process}.pid"
  script_file="/www/server/nodejs/vhost/scripts/${process}.sh"

  echo "Starting process $process..."
  bash "$script_file"
  if [ $? -eq 0 ]; then
    echo "Process $process has been started successfully"
  else
    echo "Failed to start process $process"
  fi

  echo "---"
done