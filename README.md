# INSTALLATION GUIDE

## SETUP ENVIRONNEMENT IN LINUX

### Java installation :

You need to run in a terminal the command : ` sudo apt install openjdk-21-jdk -y `

### Maven installation : 

First, download maven 3.9.9 or superior at https://maven.apache.org/download.cgi

Now unzip the downloaded archive manually or by this commands :  
` cd ~/Téléchargements `  
` unzip apache-maven-3.9.9-bin.zip `

Move the folder in /opt :  
` sudo mv apache-maven-3.9.9 /opt `

### Paths Settings for Java & Maven :
You need to add to path theses folders by editing the .profile file :  
` gedit ~/.profile `  
Add the following lines at the end of this file :  
`#java path`

`export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/"`

`#maven path`

`export MAVEN_HOME="/opt/apache-maven-3.8.8/"`

`export M2_HOME="/opt/apache-maven-3.8.8/"`

`export PATH=${M2_HOME}/bin:${PATH}`

### Mysql installation & configuration : 

Do the following command to install mysql : 

`sudo apt install mysql-server`

To configure a user account do the following : 

`sudo mysql -u root -p`

`CREATE DATABASE mddapi;`

`CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';`

`GRANT ALL ON *.* to 'user'@'localhost';`

Hit combinaison `CTRL + D` to leave mysql server.

run : `mysql -u user -p mddapi < schema.sql` to store variables in database.

## INSTALL PROJECT FILES : 

### Install Back-end API :

You need to download archive at https://github.com/ZaeRon007/Mdd_Newspaper.git or clone this repository. 

Edit a file in back repository as `.env`. Inside it, write 2 variables named : 
- `security.jwt.secret-key` and set it to a complex string
- `security.jwt.expiration-time` and set it to the amount of time required (ex:1).

Next, open a terminal and go to the project directory. 

Run : `mvn compile`

### Install Front-end API : 

You need to download archive at https://github.com/ZaeRon007/Mdd_Newspaper.git or clone this repository. 

Next, we need to install node : 

- Download and install nvm:
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`.
- close and reopen a terminal.
- Download and install Node.js : `nvm install 24`.
- Verify the Node.js version : `node -v # Should print "v24.11.1"`.
- Verify npm version : `npm -v # Should print "11.6.2"`.

Then we need to install Angular Client and configure it as global with : `npm install -g @angular/cli`.

Finally, go to project directory and run `npm install`.

# HOW TO LAUNCH PROJECT : 

You should now be abble to run :
- `ng serve` in front directory.
- `mvn spring-boot:run` in back-end directory.