export const templateLeads = (user = 'Usuário') => ({
  subject: 'Cadastrado!',
  text: `Olá ${user}! Seu cadastro foi realizado com sucesso, em breve um de nossos consultores entrará em contato com você.`,
  html: `Olá ${user}! <br> Seu cadastro foi realizado com sucesso, em breve um de nossos consultores entrará em contato com você.`
})
