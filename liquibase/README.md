
To configure Liquibase:

Download Liquibase 4.x from https://www.liquibase.org/download.
Download the Liquibase Cassandra Extension from https://github.com/liquibase/liquibase-cassandra/releases
Download the DataStax Java Drivers for Cassandra from your favorite Maven Central repository (https://repo1.maven.org/maven2/com/datastax/oss/java-driver-core/) and copy java-driver-core-X.Y.Z.jar to your liquibase/lib directory.

Prior to using Liquibase to create your schema for Better Botz, you need to create a 'betterbotz` keyspace

### Start Cassandra
`docker run -p 9042:9042 --rm --name mycassandra -d cassandra`

### Get the Cassandra Instance IP
`docker inspect mycassandra`

### Start another instance for cqlsh
`docker run -it --rm cassandra bash`
`> cqlsh 172.17.0.2`

### Create the keyspace
`cqlsh>CREATE KEYSPACE betterbotz WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`
