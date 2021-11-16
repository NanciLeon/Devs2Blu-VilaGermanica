from twilio.rest import Client

class Mensagem:
  def __init__(self):
    self.account_sid = 'INSERT HERE YOUR TWILIO ACCOUNT ID'
    self.auth_token = 'INSERT HERE YOUR TWILIO AUTH TOKEN'
    self.client = Client(self.account_sid, self.auth_token)

  def MandarMensagem1(self, numero, nome, data, hora, local, link):
    message = self.client.messages\
                  .create(
                    body="Olá, "+str(nome)+"! Sua vacina foi agendada com sucesso para o dia "+str(data)+", às "+str(hora)+", no(a) "+str(local)+". Use o seguinte QRcode no dia para agilizar seu atendimento: "+str(link),
                    from_='+14706194488',
                    to= '+55' + str(numero)
                  )
    print(message.sid)

  def MandarMensagem2(self, numero, nome, data, hora, local, link):
    message = self.client.messages\
                  .create(
                    body="Olá, "+str(nome)+"! Passando para lembrar que sua vacina está confirmada para amanhã, "+str(data)+", às "+str(hora)+", no(a) "+str(local)+". Use o seguinte QRcode no dia para agilizar seu atendimento: "+str(link),
                    from_='+14706194488',
                    to= '+55' + str(numero)
                  )
    print(message.sid)