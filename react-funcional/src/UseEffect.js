import { useState, useEffect } from 'react';

function UseEffect() {
  const [ numero, setNumero ] = useState(0);
  const [ segundoNumero, setSegundoNumero ] = useState(0);
  const [ resultado, setResultado ] = useState(0);

  const somar = () => {
    const numeroInt = parseInt(numero);
    const segNumeroInt = parseInt(segundoNumero);
    setResultado(numeroInt + segNumeroInt);
  }

  useEffect(() => {
    //aqui será chamado toda vez que uma das variáveis passadas abaixo for alterada
  }, [numero, segundoNumero])
  //se passar um array vazio, comporta-se como o ComponentDidMount
  //se não passar nada, nem o array, será chamado toda vez que qualquer variável for modificada

  return (
    <div>
      Número 1: <br />
      <input type="text" value={numero} onChange={e => setNumero(e.target.value)} /><br/>

      Número 2: <br />
      <input type="text" value={segundoNumero} onChange={e => setSegundoNumero(e.target.value)} /><br/>

      <button onClick={somar}>Somar</button><br />

      Resultado: <br />
      <input type="text" value={resultado} /><br/>
    </div>
  );
}

export default UseEffect;
