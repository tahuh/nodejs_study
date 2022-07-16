# A simple CRUD app for sample record

## requirements
- nodejs
- npm
- MySQL 8

## install required

Before you begin this, please set-up the develpment enrionment using `VSCode` , `WSL2`, and `Ubuntu on Windows` settings.
Actually I am not advertising [this video](https://nomadcoders.co/windows-setup-for-developers), but it really helps windows user.

**nodejs** installation

1. Open your `windows terminal` 

2. Type the command line below. Thats it! (Please refer to [this page](https://github.com/nodesource/distributions/blob/master/README.md) for nodejs installaion on ubuntu)

```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

If you have no `curl` then please install through

```bash
sudo apt update
sudo apt-get install -y curl
```

**npm** installation

npm, an abbreviation of **n**ode **p**ackage **m**anager is a mandatory tool for nodejs set-up

Installation can be made through

```bash
sudo apt install npm
```

**MySQL** installation

MySQL is a very classic database. If you want to know what it is, Google it!

Installation is very simple

```bash
sudo apt-get update
sudo apt-get install mysql-server mysql-client
```

**DO NOT FORGET ROOT PASSWORD WHEN INSTALL MySQL**

Thats it!

### required nodejs module installation

NodeJS modules listed below are required for server testing

- body-parser
- express
- pug
- mysql
- supervisor

These modules cann be installed via

```bash
sudo npm install <module-name> -g
```

### Start server

1. Start MySQL

Before we create server, we have to invoke the MySQL server running on Ubuntu.

```bash
sudo service mysql start
```

If you are so lazy and want to invoke automatically when the system starts

```bash
sudo systemctl enable mysql
```

2. Create a MySQL user

Because we are using user name as `user` and the password in plain text `P@ssword1234` we have to tell MySQL that this user exists and has the previliges.

Please follow the code below

```
sudo mysql -u root -p
[sudo] password for <your-name>:  Enter your 'sudo' password
Enter password: <your root password for MySQL>
```

Then a MySQL `terminal prompt` with similar message will pop up!

```
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 57
Server version: 8.0.29-0ubuntu0.20.04.3 (Ubuntu)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

Now we will type below code in MySQL prompt.

```
-- make root user has full previliges (MySQL 8 has issue for this)
-- Do not forget the quotation marks (')

mysql> grant all privileges on *.* 'root'@'localhost';

-- now we create a user whose name is user with password P@ssword1234
-- again, do not forget quotaion mark (')

mysql> create user 'user'@'localhost' identified by 'P@ssword1234';

-- Give a root privilege to that user
mysql> grant all privileges on *.* 'user'@'localhost';
```

Now check if the user can be accessed.

```bash
mysql -u user -p
Enter password: P@ssword1234
```

If MySQL prompt shows up, then try the command line in MySQL promt

```
mysql> create database testdb;

```

If MySQL says ok, then now we are ready!

2. Clone this repository

```bash
git clone https://github.com/tahuh/nodejs_study.git
```

3. Navigate to the `mysql_test` and run the application

```bash
cd mysql_text
supervisot app.js
```
### Further suggested topics for reading

- HTML
- CSS
- JavaScript
- The working mechanism of HTTP protocol
- CRUD concept
- MySQL syntax
- Template engines
- Express

