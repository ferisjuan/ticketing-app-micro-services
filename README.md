# ticketing-app-micro-services

A ticketing app with micro services

#To Have the app running

## 1. Start App

install (skaffold|skaffold.dev) and then, on the project root run:

```
skaffold dev
```

## 2. Reroute your the domain

In your _/etc/hosts_ reoute _tickets.dev_ to _127.0.0.1_ if the browser wont let you reach the _tickets.dev_ domain type _thisisunsafe_ in the brower (not the URL)

## Create the k8s secrets

```
kubectl create secret generic [secret-name] --from literal=[variable]=[secret-literal]
```
