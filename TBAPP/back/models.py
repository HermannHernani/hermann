from app import db
from sqlalchemy import DateTime
import datetime
class Paciente(db.Model):
    __tablename__ = 'db_paciente'
    paciente_id = db.Column(db.String(32), primary_key=True)
    paciente_cpf= db.Column(db.String(16), unique=True)
    paciente_nome = db.Column(db.String(200),nullable=False)
    paciente_telefone = db.Column(db.String(200),nullable=True)
    paciente_cep = db.Column(db.String(100))
    paciente_endereco= db.Column(db.String(200), nullable=False)
    paciente_nome_mae = db.Column(db.String(200), nullable=False)
    paciente_sexo = db.Column(db.Integer, nullable=False)
    paciente_altura= db.Column(db.String(3))
    paciente_peso = db.Column(db.String(3),nullable=False)
    # paciente_agravo= db.Column(db.Integer,nullable=False)
    paciente_email=db.Column(db.String(200),nullable=False)
    paciente_senha = db.Column(db.Text, nullable=False)
    paciente_horario_medicacao = db.Column(db.String(8))
    paciente_resetPasswordToken = db.Column(db.String(200))
    paciente_data_inicio = db.Column(db.DateTime,default=datetime.datetime.utcnow)
    paciente_data_fim = db.Column(db.DateTime,nullable=True)
    paciente_resetPasswordExpires = db.Column(DateTime, default=datetime.datetime.utcnow)

    tratamento = db.relationship('Tratamento', backref='Paciente', lazy=True)
    agenda = db.relationship('Agenda', backref='Paciente', lazy=True)
    vinculacao = db.relationship('Vinculacao', backref='Paciente', lazy=True)

class Tratamento(db.Model):
    __tablename__= 'db_tratamento'
    tratamento_id= db.Column(db.String(32), primary_key=True)
    tratamento_receita=db.Column(db.Integer, nullable=False)
    tratamento_ingestao=db.Column(db.Integer, nullable=False)
    tratamento_dia=db.Column(db.String(50), nullable=False)


    tratamento_paciente=db.Column(db.String(32), db.ForeignKey('db_paciente.paciente_id'),nullable=False)

    agenda = db.relationship('Agenda', backref='Tratamento', lazy=True)
class Agenda(db.Model):
    __tablename__='db_agenda'
    agenda_id=db.Column(db.String(32),primary_key=True)
    agenda_status=db.Column(db.Integer,nullable=False)
    agenda_horario_tomado=db.Column(DateTime, default=datetime.datetime.utcnow)

    agenda_tratamento=db.Column(db.String(32), db.ForeignKey('db_tratamento.tratamento_id'),nullable=False)
    agenda_paciente=db.Column(db.String(32), db.ForeignKey('db_paciente.paciente_id'),nullable=False)

class Unidade(db.Model):
    __tablename__ = 'db_unidade'
    unidade_id = db.Column(db.Integer, primary_key=True)
    unidade_nome= db.Column(db.String(100), nullable=False)
    unidade_cnes = db.Column(db.String(20), nullable=False)
    unidade_distrito = db.Column(db.String(30), nullable=False)
    unidade_ativo = db.Column(db.Boolean, nullable=False)

    vinculacao = db.relationship('Vinculacao', backref='Unidade', lazy=True)
    lotacao = db.relationship('Lotacao', backref='Unidade', lazy=True)

class Profissional(db.Model):
    __tablename__ = 'db_profissional'
    profissional_id = db.Column(db.Integer, primary_key=True)
    profissional_nome = db.Column(db.String(200), nullable=False)
    profissional_cns = db.Column(db.String(30), nullable=False)
    profissional_ativo = db.Column(db.Boolean, nullable=False)

    lotacao = db.relationship('Lotacao', backref='Profissional', lazy=True)
    designacao = db.relationship('Designacao', backref='Profissional', lazy=True)
    
class Cargo(db.Model):
    __tablename__ = 'db_cargo'
    cargo_id = db.Column(db.Integer, primary_key=True)
    cargo_nome = db.Column(db.String(100), nullable=False)
    cargo_ativo = db.Column(db.Boolean, nullable=False)

    designacao = db.relationship('Designacao', backref='Cargo', lazy=True)
    permissao = db.relationship('Permissao', backref='Cargo', lazy=True)

class Acesso(db.Model):
    __tablename__ = 'db_acesso'
    acesso_id = db.Column(db.Integer, primary_key=True)
    acesso_nome = db.Column(db.String(100), nullable=False)
    acesso_ativo = db.Column(db.Boolean, nullable=False)

    permissao = db.relationship('Permissao', backref='Acesso', lazy=True)

class Vinculacao(db.Model):
    __tablename__ = 'db_vinculacao'
    paciente_id = db.Column(db.String(32), db.ForeignKey(Paciente.paciente_id), primary_key=True)
    unidade_id = db.Column(db.Integer, db.ForeignKey(Unidade.unidade_id), primary_key=True)
    vinculacao_inicio = db.Column(db.DateTime,default=datetime.datetime.utcnow)
    vinculacao_fim = db.Column(db.DateTime,nullable=True)
    vinculacao_ativo = db.Column(db.Boolean, nullable=True)

    vinculacao_paciente=db.Column(db.String(32), db.ForeignKey('db_paciente.paciente_id'),nullable=False)
    vinculacao_unidade=db.Column(db.Integer, db.ForeignKey('db_unidade.unidade_id'),nullable=False)

class Lotacao(db.Model):
    __tablename__ = 'db_lotacao'
    unidade_id = db.Column(db.Integer, db.ForeignKey(Unidade.unidade_id), primary_key=True)
    profissional_id = db.Column(db.Integer, db.ForeignKey(Profissional.profissional_id), primary_key=True)
    lotacao_inicio = db.Column(db.DateTime,default=datetime.datetime.utcnow)
    lotacao_fim = db.Column(db.DateTime,nullable=True)
    lotacao_ativo = db.Column(db.Boolean, nullable=True)

    lotacao_unidade=db.Column(db.Integer, db.ForeignKey('db_unidade.unidade_id'),nullable=False)
    lotacao_profissional=db.Column(db.Integer, db.ForeignKey('db_profissional.profissional_id'),nullable=False)

class Designacao(db.Model):
    __tablename__ = 'db_designacao'
    cargo_id = db.Column(db.Integer, db.ForeignKey(Cargo.cargo_id), primary_key=True)
    profissional_id = db.Column(db.Integer, db.ForeignKey(Profissional.profissional_id), primary_key=True)
    designacao_inicio = db.Column(db.DateTime,default=datetime.datetime.utcnow)
    designacao_fim = db.Column(db.DateTime,nullable=True)
    designacao_ativo = db.Column(db.Boolean, nullable=True)

    designacao_cargo=db.Column(db.Integer, db.ForeignKey('db_cargo.cargo_id'),nullable=False)
    designacao_profissional=db.Column(db.Integer, db.ForeignKey('db_profissional.profissional_id'),nullable=False)

class Permissao(db.Model):
    cargo_id = db.Column(db.Integer, db.ForeignKey(Cargo.cargo_id), primary_key=True)
    acesso_id = db.Column(db.Integer, db.ForeignKey(Acesso.acesso_id), primary_key=True)
    __tablename__ = 'db_permissao'

    permissao_ativo = db.Column(db.Boolean, nullable=True)

    permissao_cargo=db.Column(db.Integer, db.ForeignKey('db_cargo.cargo_id'),nullable=False)
    permissao_acesso=db.Column(db.Integer, db.ForeignKey('db_acesso.acesso_id'),nullable=False)

if __name__== "__main__":
    db.create_all()