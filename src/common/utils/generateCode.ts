export class GenerateCode {
  async gerarCodigo() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        const indiceLetras = Math.floor(Math.random() * letras.length);
        codigo += letras.charAt(indiceLetras);
      } else {
        const indiceNums = Math.floor(Math.random() * nums.length);
        codigo += nums.charAt(indiceNums);
      }
    }

    return codigo;
  }
}
