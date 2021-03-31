#!/bin/bash
tar -cvf homepage.tar -C ./fork-homepage ./
for i in `awk '{print $1}' passwd.env`
do
j=`awk -v I="$i" '{if(I==$1)print $2}' passwd.env`
k=`awk -v I="$i" '{if(I==$1)print $3}' passwd.env`
echo "upapk.expect ./homepage.tar $i $j $k"
expect upapk.expect ./homepage.tar $i $j $k
done