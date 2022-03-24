import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import './FaqPage.css';
import Navbar from "../ComponentsSempreUEA/Navbar";
import FaqPageStyle from "views/FaqPage/FaqPageStyle.jsx";
import image from "assets/img/FaqsImg.jpg";



const data = [
  {
    title: 'O que é tuberculose?',
    paragraph: 'Uma doença infecciosa, geralmente ataca os pulmões, mas pode atingir outras partes do corpo. É causada por uma bactéria chamada bacilo de Koch. ',
    text: '(Mycobacterium tuberculosis)',
  },
  {
    title: 'Quais os sintomas da tuberculose?',
    paragraph: 'Tosse, com ou sem catarro, por mais de três semanas; Febre baixa no final da tarde; Suor noturno; Cansaço/Fadiga; Dor no peito; Falta de vontade para comer; Emagrecimento.',
    },
  {
    title: 'Como é transmitida a tuberculose?',
    paragraph: 'A pessoa doente, sem tratamento, ao tossir, falar ou espirrar, lança gotículas no ar contendo bacilos que se espalham no ambiente. Então, pela respiração, os bacilos podem chegar aos pulmões das pessoas que convivem com o doente.',
    // paragraph:"SOMENTE PESSOAS COM TUBERCULOSE PULMONAR OU LARÍNGEA TRANSMITEM A DOENÇA"
  },

  {
    title: 'Quem não transmite a tuberculose?',
    paragraph: "As pessoas que estão com tuberculose e utilizando a medicação corretamente por mais de 15 dias ou até o exame da baciloscopia (escarro) estiver negativo. Pessoas com tuberculose extrapulmonar (fora do pulmão), ou seja, aquelas pessoas com tuberculose em outros órgãos, como osso, pele, fígado, pleura, intestino, rins, sistema nervoso central e gânglios.",
    // paragraph:"TUBERCULOSE NÃO SE PEGA ATRAVÉS DE COPOS, TALHERES, BEIJOS, ABRAÇOS OU RELAÇÃO SEXUAL."
  },
  {
    title: 'Quem são os grupos mais susceptíveis a desenvolver tuberculose?',
    paragraph: "Pessoas com HIV/AIDS; Detentos; Moradores de rua; Indígenas; Profissionais de saúde; Pessoas que convivem com pacientes com tuberculose, principalmente crianças e idosos, e pessoas com diabetes."
  },
  {
    title: 'Mesmo vacinado com a BCG, posso contrair tuberculose?',
    paragraph: " Sim. A vacina BCG está indicada ao nascer e pode ser realizada até quatro anos de vida, sendo obrigatória no primeiro ano de vida. A vacina BCG protege somente crianças das formas mais graves da doença, como a tuberculose que ataca o sistema nervoso e a tuberculose miliar."
  },
  {
    title: 'Estou com os sintomas, que serviço de saúde devo procurar?',
    paragraph: "Se você estiver com tosse com ou sem catarro por mais de três semanas, procure a Unidade de Saúde mais próxima da sua residência para que seja realizado o exame de escarro.",

  },
  {
    title: 'Quais são os exames que devo realizar? ',
    paragraph: "Para o diagnóstico da doença: Exame de escarro (baciloscopia, teste rápido molecular e cultura) e/ou radiografia de tórax. Durante o tratamento da doença, são solicitados outros exames: teste de HIV, glicemia e exames de sangue para avaliar a função do fígado e dos rins. Outros exames podem ser solicitados para complementar o diagnóstico."
  },
  {
    title: 'Como realizar a coleta do exame de escarro?',
    paragraph: "Você receberá um frasco coletor com tampa, identificado com o seu nome e data da coleta. Importante que a coleta seja em um local bem ventilado e de preferência com luz do sol. Ao despertar pela manhã, lavar bem a boca com apenas água, sem usar pasta de dente. Puxe o ar pelo nariz, fique com a boca fechada, prenda a respiração por um instante e solte o ar lentamente pela boca. Repita esse movimento por três vezes e apósforce a tosse e escarre. Imediatamente, abra o pote e coloque o escarro dentro do pote, evitando que a secreção escorra por fora do coletor. Repetir este procedimento quantas vezes forem necessárias até conseguir um volume de escarro, entre 5 a 10 ml. Em seguida, tampe o pote e coloque em uma sacola, mantendo a tampa para cima, e não esqueça de lavar as mãos, após a coleta."
  },
  {
    title: 'Tuberculose tem cura? ',
    paragraph: "Sim. Para isso, é importante que você siga as orientações do profissional de saúde que está realizando seu acompanhamento, devendo tomar a medicação diariamente durante todo o período de tratamento, mesmo que você apresente melhoras dos sintomas, pois só é possível a cura da doença com o término do tratamento recomendado pelo profissional de saúde."
  },
  {
    title: 'Como é o tratamento?',
    paragraph: "O tratamento, em geral, dura seis meses.Depois de 15 a 30 dias de tratamento, a pessoa deixa de transmitir a tuberculose, mas deve ser confirmado através do exame de escarro. Os remédios devem ser tomados diariamente, conforme orientado pelo profissional de saúde."
  },
  {
    title: 'Quais são os medicamentos utilizados no tratamento da tuberculose?',
    paragraph: 'Rifampicina, isoniazida, pirazinamida e etambutol são os medicamentos utilizados nos dois primeiros meses da doença (conhecida como fase de ataque), podendo ser utilizados por mais tempo. Nos últimos quatro meses (conhecida como fase de manutenção), somente a rifampicina e a isoniazida. O número de comprimidos, a ser tomado diariamente no mesmo horário e pela manhã, vai depender do seu peso.'
  },
  {
    title: 'Comecei a tomar a medicação. O que posso sentir?',
    paragraph: "Náusea e vômitos, Dor no estômago, Suor e/ou urina de cor avermelhada, Dor de cabeça, Coceira, Dor nas articulações. CONTINUE A TOMAR A MEDICAÇÃO, NA PRESENÇA DE ALGUM DESSES SINTOMAS,  RETORNE A UNIDADE DE SAÚDE PARA AVALIAÇÃO DO PROFISSIONAL DE SAÚDE."
  },
  {
    title: 'Comecei a tomar a medicação mas me senti mal. O que devo fazer?',
    paragraph: " Retorne ao serviço de saúde imediatamente, para que um profissional de saúde possa lhe avaliar. Não pare o tratamento."
  },
  {
    title: 'Se eu deixar de tomar a medicação, o que acontece?',
    paragraph: "Você volta a transmitir a tuberculose e os sintomas da doença podem voltar; Os bacilos que não morreram, tornam-se mais resistentes aos medicamentos, e, neste caso, a cura torna-se mais difícil.; Pode ser necessário mudar os medicamentos e aumentar o tempo do tratamento, que pode chegar a dois anos."
  },
  {
    title: 'Eu preciso parar de beber bebidas alcoólicas durante o tratamento da tuberculose?',
    paragraph: "É aconselhável que sim. Não se podem tomar bebidas alcoólicas, como cachaças, cervejas, whisky, vinhos, e outros, durante o tratamento, pois há riscos de complicações, como por exemplo: a hepatite. No entanto, se você tiver dificuldade de parar de beber ou deixar de fazer uso de outras drogas, converse com o profissional de saúde."
  },
  {
    title: 'É preciso parar de fumar?',
    paragraph: "É aconselhável que sim, pois melhora sua saúde. O profissional de saúde poderá lhe encaminhar para alguns serviços que possam auxiliar neste caso. Mas, se você que realmente não consegue parar o fumo, é importante que você continue a tomar as medicações e que o profissional de saúde seja comunicado."
  },
  {
    title: 'Por que é importante realizar o exame de HIV?',
    paragraph: "O HIV é uma doença silenciosa que compromete a defesa do organismo contra outras doenças, como a tuberculose. Quando o paciente apresenta as duas doenças (TB eHIV), a chance de agravamento é maior. Por isso, torna-se importante a descoberta precoce por meio da testagem de HIV"
  },
  {
    title: 'Por que as pessoas que moram comigo tem que ser examinadas?',
    paragraph: "Porque as pessoas que moram com você (família) por estarem no mesmo ambiente,  têm maior risco de se infectar e adoecer, pois antes do diagnóstico e início do tratamento você libera para o meio ambiente as bactérias causadoras da doença. Nesse caso é importante que todos sejam examinados, os que possuem sintomas através do exame de escarro, e os  que não apresentem os sintomas da tuberculose através do exame de Prova Tuberculínica (PT) e radiografia de tórax, pois existe a possibilidade de seus contatos estarem infectados e com risco de desenvolver a doença nos próximos anos."
  },
  {
    title: 'O que é infecção latente da tuberculose?',
    paragraph: "Pelo menos 25% da população é infectada pelo bacilo da tuberculose, mas isso não significa que estejam doentes, pois ainda não apresentam os sintomas da doença, isso é chamado de infecção latente da tuberculose. Após a infecção, o organismo consegue combater a doença, no entanto, algumas pessoas com a imunidade comprometida podem desenvolver a tuberculose durante a vida. De cada 100 pessoas infectadas, pelo menos 10 irão desenvolver tuberculose durante a vida, sendo que a metade delas desenvolverão nos próximos dois anos."
  },
  {
    title: 'Qual a importância de tomar a medicação diariamente no mesmo horário?',
    paragraph: "A medicação da tuberculose deve ser tomada todos os dias, sempre no mesmo horário pela manhã, pois o esquecimento da tomada da medicação, ou a tomada das medicações sempre em horários diferentes pode comprometer a resposta da medicação ao organismo e levar à resistência aos medicamentos ou até mesmo aumentar o tempo de tratamento."
  }, 
  {
    title: 'Sou diabético e estou com tuberculose. Quais cuidados tenho que ter?',
    paragraph: "Se você é diabético e descobriu que está com tuberculose, é muito importante que você comunique ao profissional de saúde que está lhe acompanhando, pois a medicação utilizada no tratamento da tuberculose, pode reduzir o efeito das suas medicações da diabetes. Em muitos casos, é necessário trocar a medicação oral por insulina para manter seu açúcar no sangue dentro da normalidade. Outro lembrete importante é sempre que possível, procurar o posto de saúde para verificar como está o açúcar no sangue (glicemia), para verificar se há alterações nos resultados."
  }, 
  {
    title: 'Descobri que estou grávida durante o meu tratamento da tuberculose. O que devo fazer?',
    paragraph: "Pode manter a calma, pois os medicamentos da tuberculose são utilizados regularmente na gestação. Mas é importante que você comunique ao profissional de saúde e lembre-se que o uso da medicação, diminui o risco de infecção ao bebê e aos que moram com você."
  }, 
  {
    title: 'Faço uso de anticoncepcional e fui diagnosticada com tuberculose. Quais cuidados devo ter?',
    paragraph: "O efeito dos anticoncepcionais orais (pílulas) pode diminuir por conta das medicações do tratamento da tuberculose, sendo mais seguros, outros métodos anticoncepcionais durante o tratamento da doença. Nesse caso, é importante que você informe ao profissional de saúde, para que ele avalie e sugira outro método."
  }, 
  {
    title: 'Por que devo realizar o exame de escarro todos os meses?',
    paragraph: "É importante que você realize mensalmente os exames solicitados pelo profissional de saúde, principalmente o exame de escarro, pois é através desse exame que o profissional de saúde será capaz de avaliar se o medicamento está agindo contra o bacilo."
  }, 
  {
    title: 'Por que devo ir às consultas agendadas?',
    paragraph: "Durante o tratamento, serão agendadas consultas mensais para que o profissional de saúde avalie seu estado de saúde, solicite exames de controle da doença, tire suas dúvidas, verifique os resultados dos exames e entregue as medicações. SE VOCÊ PERDER UMA CONSULTA MARCADA, DEVE COMPARECER AO SERVIÇO DE SAÚDE O MAIS RÁPIDO QUE PUDER. "
  }, 
  {
    title: 'Estou com tuberculose e agora?',
    paragraph: 'Não há necessidade de sentir vergonha, não há necessidade de realizar isolamento social. Se você está seguindo o tratamento corretamente, você pode seguir com a sua rotina de trabalho, passear, estudar, namorar, levar uma vida normal.  Só não pode esquecer de tomar os medicamentos!'
  },
  {
    title:'Estou fazendo o tratamento da tuberculose, quais cuidados devo ter em relação a COVID-19?',
    paragraph:'É importante manter o tratamento e ter os seguintes cuidados: o uso de máscaras, lavagem das mãos com água e sabão, o uso de álcool em gel, evitar aglomerações, além de verificar como está seu esquema vacinal contra a COVID-19. Em casos de sintomas como febre, tosse seca, cansaço, dor de garganta, coriza, falta de olfato e paladar procurar o serviço.'
  },
  {
    title:'Qual o horário de funcionamento das unidades de saúde?',
    paragraph:'A maioria das unidades básicas de saúde da Secretaria Municipal de Manaus funcionam de segunda a sexta, das 07 às 17h, além de 10 Unidades Básicas de Saúde com horário diferenciado, de segunda a sexta-feira das 07:00 as 21:00h e aos sábados de 08:00 as 12:00h. Para demais informações podem ser acessadas no site:',
    link: 'https://semsa.manaus.am.gov.br/localizacao-das-unidades-de-saude/.'
  },
  {
    title:'Como faço para ter acesso aos resultados dos meus exames de escarro? ',
    paragraph:'Ao realizar a entrega do material do exame de escarro, o laboratório entrega ao usuário um localizador, sendo através deste e seu CPF (Cadastro de Pessoa Física) possível acessar os resultados dos exames realizados. A Secretaria Municipal de Manaus disponibiliza os resultados de exames através do site:', 
    link: 'https://labonline.manaus.am.gov.br/exames.php' 
  }
]

class Accordion extends React.Component {
  render() {
    return (
      <div {...{ className: 'wrapper' }}>
        <ul {...{ className: 'accordion-list' }}>
          {data.map((data, key) => {
            return (
              <li {...{ className: 'accordion-list__item', key }}>
                <AccordionItem {...data} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  }

  render() {
    const {
      props: {
        text,
        paragraph,
        title,
        link
      },
      state: {
        opened
      }
    } = this

    return (
      <div
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          onClick: () => { this.setState({ opened: !opened }) }
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3 {...{ className: 'accordion-item__title' }}>
            {title}
          </h3>
          <span {...{ className: 'accordion-item__icon' }} />
        </div>
        <div {...{ className: 'accordion-item__inner' }}>
          <div {...{ className: 'accordion-item__content' }}>
            <p {...{ className: 'accordion-item__paragraph' }}>
              {paragraph}
            </p>
            <p {...{ className: 'accordion-item__paragraph2' }}>
              {text}
            </p>
            <a {...{ className: 'accordion-item__paragraph3' }}>
              <a href={link}>{link}</a>
            </a>


          </div>
        </div>

      </div>
    )
  }
}

class FaqPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar page={"faq"} />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top"
          }}

        >

          <div className={classes.container}>

            <GridContainer justify="center">
              <div>
                <h3><b>Dúvidas frequentes</b></h3>
              </div>
              <div>
                <h5><b>Esta área reúne as dúvidas mais frequentes sobre a tuberculose</b></h5>
              </div>
              <GridItem xs={12} sm={12} md={9}>
                <Accordion />
              </GridItem>
            </GridContainer>
            

          </div>
          <br />
          <div className={classes.referenceText}>
            BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Departamento de Vigilância Epidemiológica. <b>Manual de recomendações para o controle da tuberculose no Brasil</b>. Brasília: Ministério da Saúde; 2019.
          </div>
          <br />
          
        </div>
        <Footer />
      </div>
      
    );
  }
}

export default withStyles(FaqPageStyle)(FaqPage);
