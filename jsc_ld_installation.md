# How to install JSC-LD

This json-schema-ld package can be either installed from npm or setup from cloning the repository.

```bash
git clone https://github.com/KNowledgeOnWebScale/json-schema-ld
npm i json-schema-ld
```

## Usage

```none
JSC-LD

JSON Schema LD is a syntactic sugar for JSON Schema to enable generative
interoperability by means of representing JSON schema in RDF vocabularies
(RDF Scheme) and RDF shapes in SHACL.

Synopsis

  $ json-schema-ld --source json_schema.js --out out --prefix example --url
  "http://example.com/"
  $ json-schema-ld --source json_schema.js -p example -u "http://example.com"

Options

  -s, --source path/to/source/file|directory   Path to a JSON schema file or a directory contains JSON schema files
  -p, --prefix prefix                          JSC-LD predefined namespace prefix
  -f, --format format                          RDF serialization format: Turtle, application/trig, N-Triples, or N-Quads. It
                                               defaults to Turtle.
  -u, --uri uri                                JSC-LD predefined namespace URI
  -o, --out path/to/directory                  Path to output directory defaults to "out"
  -h, --help                                   Display this usage guide

```
