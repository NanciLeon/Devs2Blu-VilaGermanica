from github import Github
import qrcode
import os

token = 'INSERT HERE YOUR GITHUB ACCESS TOKEN'
g = Github(token)

def GerarQrCode(cpf):
    imagem_qrcode = qrcode.make(cpf)
    imagem_qrcode.save(str(cpf)+'.png')
    repo = g.get_user().get_repo("moreDevs2Blu")
    all_files = []
    contents = repo.get_contents("")
    while contents:
        file_content = contents.pop(0)
        if file_content.type == "dir":
            contents.extend(repo.get_contents(file_content.path))
        else:
            file = file_content
            all_files.append(str(file).replace('ContentFile(path="','').replace('")',''))

    image = open(str(cpf)+'.png', 'rb')
    content = image.read()

    # Upload to github
    git_file = str(cpf)+'.png'
    if git_file in all_files:
        contents = repo.get_contents(git_file)
        repo.update_file(contents.path, "committing files", content, contents.sha, branch="main")
        image.close()
        os.remove(str(cpf)+'.png')
        return "https://vinicios-tribess.github.io/moreDevs2Blu/" + str(cpf) + '.png'
    else:
        repo.create_file(git_file, "committing files", content, branch="main")
        image.close()
        os.remove(str(cpf)+'.png')
        return "https://vinicios-tribess.github.io/moreDevs2Blu/" + str(cpf) + '.png'