#!/bin/bash
kubectl get svc | grep -q smartgrid-wechat-portal-client
if [ "$?" == "1" ];then
	kubectl create -f smartgrid_wechat_portal_client-service.yaml --record
	kubectl get svc | grep -q smartgrid-wechat-portal-client
	if [ "$?" == "0" ];then
		echo "smartgrid_wechat_portal_client-service install success!"
	else
		echo "smartgrid_wechat_portal_client-service install fail!"
	fi
else
	echo "smartgrid_wechat_portal_client-service is exist!"
fi
kubectl get pods | grep -q smartgrid-wechat-portal-client
if [ "$?" == "1" ];then
	kubectl create -f smartgrid_wechat_portal_client-deployment.yaml --record
	kubectl get pods | grep -q smartgrid-wechat-portal-client
	if [ "$?" == "0" ];then
		echo "smartgrid_wechat_portal_client-deployment install success!"
	else
		echo "smartgrid_wechat_portal_client-deployment install fail!"
	fi
else
	kubectl delete -f smartgrid_wechat_portal_client-deployment.yaml
	kubectl get pods | grep -q smartgrid-wechat-portal-client
	while [ "$?" == "0" ]
	do
	kubectl get pods | grep -q smartgrid-wechat-portal-client
	done
	kubectl create -f smartgrid_wechat_portal_client-deployment.yaml --record
	kubectl get pods | grep -q smartgrid-wechat-portal-client
	if [ "$?" == "0" ];then
		echo "smartgrid_wechat_portal_client-deployment update success!"
	else
		echo "smartgrid_wechat_portal_client-deployment update fail!"
	fi
fi