# etl-persona

# About

Nodejs version > 8

# Install dependencies

``` bash

$ npm install

```

Modify CsvWriterMixin to prevent error

/node_modules/datadumps/lib/mixin/CsvWriterMixin.js

On line 26, replace this

``` javascript
    return target.on('end', function() {
        return target._csv.writer.write(null);
    });
      
```

With this

``` javascript
    return target.on('end', function() {
        return target._csv.writer.end();
    });
```
# Run

``` bash

$ npm run start

```

# Node datadumps

[Official repo](https://github.com/agmen-hu/node-datapumps)