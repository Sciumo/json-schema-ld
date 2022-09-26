const fs = require('fs');
import path from "path";
const commandLineArgs = require('command-line-args')
import commandLineUsage from 'command-line-usage';
import {JSCLDSchema} from "./JSCLD";
import {ConfigParser} from "./ConfigParser";


const cli_args = [
    { name: 'source', alias: 's', type: String},
    { name: 'out', alias: 'o', type:String},
    { name: 'config', alias: 'c', type:String},
]

const options = commandLineArgs(cli_args)

const usage = commandLineUsage([
    {
        header: 'JSC-LD',
        content: 'JSON Schema LD is a syntactic sugar for JSON Schema to enable generative interoperability by means of representing JSON schema in RDF vocabularies (RDF Scheme) and RDF shapes in SHACL.'
    },
    {
        header:"Synopsis",
        content: [
            '$ node JSONSchemaParser.js --source json_schema.js --out out --config config.js',
            '$ node JSONSchemaParser.js --source json_schema.js --config config.js',
            'node JSONSchemaParser.js -s json_schema.js -c config.js'
        ]
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'config',
                alias: 'c',
                typeLabel: '{underline config_file}',
                description: 'JSC-LD configuration file',
                type: String
            },
            {
                name: 'source',
                alias: 's',
                typeLabel: '{underline path/to/source/file|directory}',
                description: 'Path to a JSON schema file or a directory contains JSON schema files',
                type: String
            },
            {
                name: 'out',
                alias: 'o',
                typeLabel: '{underline path/to/directory}',
                description: 'Path to output directory defaults to "out"',
                type: String
            },
            {
                name: 'help',
                alias: 'h',
                description: 'Display this usage guide',
                type: Boolean
            }

        ]
    },
    {
        content: 'Project home: {underline https://github.com/jiaoxlong/jsc-ld}'
    }
]);

const opts = ['source', 'config']

let cp: ConfigParser;
let out: string;
if (Object.keys(options).length===0)
    console.log(usage);
else {
    if (hasKeys(options, opts)){
       const source = jsc_source_files(options);
       out = 'out' in options ? options['out'] : 'out'
       if (fs.existsSync(options['config'])){

           cp = new ConfigParser(path.resolve(options['config']), source, out);
           for (const jsc of cp.source){
               let ld = new JSCLDSchema(jsc, cp);
               ld.serialize();
               ld.materialize();
           }
       }
       else
           throw new Error('Can not locate JSC-LD at '+options['config']+'.');
    }
    else{
        console.log(usage)
    }
}

function jsc_source_files(argvs:{}){
    let source_list = [];
    if (fs.statSync(argvs['source']).isDirectory()){
        fs.readdirSync(argvs['source']).forEach(file => {
            source_list.push(path.join(argvs['source'], file));
        });
    }
    else if (fs.statSync(argvs['source']).isFile()) {
        source_list.push(argvs['source']);
    }
    else throw Error("The 'source' given in the JSON Schema extension file neither points to a directory " +
            "nor to a file");
    return source_list;

}

function hasKeys(object, keys){
    return keys.every(function (key) {
        return object.hasOwnProperty(key);
    });
}