import React from 'react';
// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  Box,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

// ---------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 900,
  minHeight: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: theme.spacing(4, 8),
  margin: theme.spacing(0)
}));

// ---------------------------------------------------------

const SectionCard = () => (
  <CardStyle>
    <Box mb={4}>
      <Typography mb={2} align="center" variant="h4">
        Formulário
      </Typography>
      <Typography display="block" mb={2} variant="body">
        Olá seja bem-vind@! Esse é o local para você nos contar qual o seu
        problema, são algumas perguntas simples e você não precisa se
        identificar. Conte um problema vivido pela sua comunidade ou até mesmo
        pessoal!
      </Typography>
      <Typography display="block" mb={2} variant="body">
        Após a submissão nós vamos analisar e procurar a pessoa certa para
        resolver esse problema!
      </Typography>
      <Typography display="block" mb={2} variant="body">
        Qualquer dúvida você pode nos mandar uma mensagem no WhatsApp 61
        983200546 ou no nosso e-mail contato@luzconecta.com.br e caso se sinta
        mais a vontade você pode até mesmo nos contar seu problema por lá.
      </Typography>
      <Typography display="block" mb={2} variant="body">
        Nós agradecemos a confiança e logo que possível estaremos dando um
        feedback para você!
      </Typography>
      <Typography display="block" mb={2} variant="body">
        PS: Caso queira receber um e-mail com o ODS (Objetivo de Desenvolvimento
        Sustentável) em que seu problema mais se encaixa, não esquece de
        deixá-lo registrado na penúltima pergunta deste formulário.
      </Typography>
    </Box>

    <Card>
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="h2">
          Qual o seu gênero?
        </Typography> */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Qual o seu gênero?</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Feminino"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Masculino"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Prefiro não responder"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  </CardStyle>
);

export default SectionCard;
