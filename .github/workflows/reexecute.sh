#!/bin/bash

processes=(
  "proxy_eu_1"
  "proxy_eu_2"
  "proxy_eu_3"
  "proxy_sg_1"
  "proxy_sg_2"
  "proxy_sg_3"
)

for process in "${processes[@]}"
do
  pid_file="/www/server/nodejs/vhost/pids/${process}.pid"
  script_file="/www/server/nodejs/vhost/scripts/${process}.sh"

  if [ -f "$pid_file" ]; then
    pid=$(cat "$pid_file")
    if ps -p $pid > /dev/null; then
      echo "Process $process is running with PID $pid"
      echo "Stopping process $process..."
      kill $pid
      if [ $? -eq 0 ]; then
        echo "Process $process has been stopped successfully"
      else
        echo "Failed to stop process $process"
      fi
    else
      echo "Process $process is not running"
    fi
  else
    echo "Process $process is not running"
  fi

  # Thêm khoảng thời gian chờ 5 giây
  echo "Waiting for 5 seconds before starting process $process..."
  sleep 5

  echo "Starting process $process..."
  bash "$script_file"
  if [ $? -eq 0 ]; then
    echo "Process $process has been started successfully"
  else
    echo "Failed to start process $process"
  fi

  echo "---"
done