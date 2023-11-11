/* import { appendFile } from "node:fs";
import { CityCriteria } from "./interface/SIACityCriteria.js";
import { ConditionsCriteria } from "./app/ArrayCriteria.js";
import { Dbc } from "./core/Dbc.js";


const cityFilter = CityCriteria.set('330455');
const diseaseFilter = ConditionsCriteria.set([
    'T36',
    'T361', 'T362', 'T363', 'T364', 'T365', 'T366', 'T367', 'T368', 'T369',
    'T37',
    'T371', 'T372', 'T373', 'T374', 'T375', 'T376', 'T377', 'T378', 'T379',
    'T38',
    'T381', 'T382', 'T383', 'T384', 'T385', 'T386', 'T387', 'T388', 'T389',
    'T39',
    'T391', 'T392', 'T393', 'T394', 'T395', 'T396', 'T397', 'T398', 'T399',
    'T40',
    'T401', 'T402', 'T403', 'T404', 'T405', 'T406', 'T407', 'T408', 'T409',
    'T41',
    'T411', 'T412', 'T413', 'T414', 'T415', 'T416', 'T417', 'T418', 'T419',
    'T42',
    'T421', 'T422', 'T423', 'T424', 'T425', 'T426', 'T427', 'T428', 'T429',
    'T43',
    'T431', 'T432', 'T433', 'T434', 'T435', 'T436', 'T437', 'T438', 'T439',
    'T44',
    'T441', 'T442', 'T443', 'T444', 'T445', 'T446', 'T447', 'T448', 'T449',
    'T45',
    'T451', 'T452', 'T453', 'T454', 'T455', 'T456', 'T457', 'T458', 'T459',
    'T46',
    'T461', 'T462', 'T463', 'T464', 'T465', 'T466', 'T467', 'T468', 'T469',
    'T47',
    'T471', 'T472', 'T473', 'T474', 'T475', 'T476', 'T477', 'T478', 'T479',
    'T48',
    'T481', 'T482', 'T483', 'T484', 'T485', 'T486', 'T487', 'T488', 'T489',
    'T49',
    'T491', 'T492', 'T493', 'T494', 'T495', 'T496', 'T497', 'T498', 'T499',
    'T50',
    'T501', 'T502', 'T503', 'T504', 'T505', 'T506', 'T507', 'T508', 'T509'
]);

process.on('message', async (file: string) => {
    console.log(`O processo ${ process.pid } iniciou o processamento do arquivo ${ file }.`);
    const dbc = await Dbc.load('./' + file);
    const summary = {
        id: file,
        total: dbc.size,
        founds: 0,
    };

    await dbc.forEachRecords(async(record: any) => {
        if(cityFilter.match(record) && diseaseFilter.match(record)) {
            appendFile('data.json', `${ record }`, (err) => {
                if (err) throw err;
                summary.founds++
                // @ts-ignore
                process.send(record)
            });
        }
    })
    
    appendFile('summary.json', `${ JSON.stringify(summary) }`, (err) => {
        if (err) throw err;
        console.log(`\nO Processo ${process.pid} encerrou a leitura e o resumo dos jobs é:\n - Encontrados: ${summary.founds}\n - Total: ${summary.total}\n`);
        // @ts-ignore
        process.exit(0)
    });
}); */