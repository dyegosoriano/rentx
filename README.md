# Cadastro de carro

**Requisitos funcionais**
Deve ser possível cadastrar um novo carro.
Deve ser possível listrar todas as categorias.

**Regras de negócios**
Não deve ser possível cadastrar um carro com placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão como disponivel.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Requisitos funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros pelo nome da categoria.
Deve ser possível listar todos os carros pelo nome da marca.
Deve ser possível listar todos os carros pelo nome do carro.

**Regras de negócios**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**Requisitos funcionais**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.

**Regras de negócios**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**Requisitos funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**Requisitos não funcionais**
Utilizar o multer para upload dos arquivos.

**Regras de negócios**
O usuário responsável pelo cadastro deve ser um usuário administrador.
O usuário deve cadastrar mais de uma imagem para o mesmo carro.

# Aluguel de carro

**Requisitos funcionais**
Deve ser possível cadastrar um aluguel.
**Regras de negócios**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
