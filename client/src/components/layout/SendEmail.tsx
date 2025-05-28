import emailjs from '@emailjs/browser';
//solução vai ser feita com emailJS
export default function SendEmail(data:any){
    console.log('bom dia')
    if(data.nome === '' || data.email==='' || data.mensagem===''){
        alert('Preencha todos os campos antes de enviar!');
        return;
    }
    const templateParams = {
        from_name: data.nome,
        message:data.mensagem,
        email:data.email
    }
    emailjs.send('service_4sszohx','template_ropr234', templateParams, 'xxAvjWlCFhqkhD4-U')
    .then((response)=>{
        console.log('sucesso', response.status, response.text);
    }).catch((error)=>{
        console.log('erro: ', error);
    })
    alert('email enviado com sucesso!');
}