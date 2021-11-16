import gspread
import time
from SMS import Mensagem
from QrCode import GerarQrCode
from pytz import timezone
from datetime import datetime, timedelta
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name("INSERT HERE YOUR CREDNCIALS.JSON FILE FROM GOOGLE API", scope)
gc = gspread.authorize(credentials)
wks = gc.open("BaseTeste2").sheet1

while True:

  dados = wks.get_all_records()
  fuso_horario = timezone('America/Sao_Paulo')
  data_agora = datetime.today().astimezone(fuso_horario).strftime('%Y-%m-%d')
  hora_agora = datetime.today().astimezone(fuso_horario).strftime('%H:%M')

  for item in dados:
    mensagem1 = item["Mensagem1"]
    mensagem2 = item["Mensagem2"]
    telefone  = item["Telefone"]
    nome      = item["Nome"]
    cpf       = item["CPF"]
    local     = item["LocalVacina"]
    data      = datetime.strptime(item["Data"], '%d/%m/%Y').date()
    hora      = item["Hora"]
    if mensagem1 == "FALSO":
      sms = Mensagem()
      link = GerarQrCode(cpf)
      sms.MandarMensagem1(telefone, nome, data, hora, local, link)
      ID = wks.find(str(cpf))
      wks.update('I' + str(ID.row), 'VERDADEIRO')
    elif mensagem2 == "FALSO" and str(data_agora) >= str(data - timedelta(1)) and int(hora_agora.replace(":", "")) >= int(hora.replace(":", "")):
      sms = Mensagem()
      link = GerarQrCode(cpf)
      sms.MandarMensagem2(telefone, nome, data, hora, local, link)
      ID = wks.find(str(cpf))
      wks.update('J' + str(ID.row), 'VERDADEIRO')
    else:
      pass
  time.sleep(5)