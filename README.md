#Read_Dbc

## Compilando para sua versão

Dado a complexidade do desenvolvimento desse módulo o ideal é descrever os passos em que ocorreu.

1. *Primeiro instale o node-gyp para buildar os bindings pro node**

```
npm i -g node-gyp
```

2. *Vá para a pasta `addon` e crie o arquivo _binging.gyp_*

3. *Remova qualquer arquivo de binding anterior e qualquer file referenciando versões anteriores do node*

```
node-gyp clean
node-gyp remove <VERSÃO>
```

4. *Configure os bindings*

```
node-gyp configure
```

5. *Build*

```
node-gyp build
```


## Usando o pacote

1. *Instancie a classe e aponte para um arquivo .dbc*

```js
const dbcFile = new Dbc('path_to_file.dbc')
```

2. *O arquivo retorna um Array de linhas, se quiser faça um map para manipular*

```js
dbcFile.map((i: any) => console.log(i))
```

3. *Lembre de excluir o arquivo, pois ele fica salvo na pasta temporária*

```js
dbcFile.remove()
```