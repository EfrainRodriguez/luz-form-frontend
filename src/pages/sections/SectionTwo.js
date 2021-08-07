import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Card,
  Typography,
  Box,
  CardContent,
  FormControl,
  Button,
  TextField
} from '@material-ui/core';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// components
import { RadioGroupForm, InterestQuestion } from '../../components';
// constants
const options = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  }
];

const timeOptions = [
  {
    label: 'No máximo 3 dias',
    value: 'days'
  },
  {
    label: 'No máximo 1 semana',
    value: 'week'
  },
  {
    label: 'No máximo 1 mês',
    value: 'month'
  },
  {
    label:
      'Não me importaria com o tempo, desde que meu problema fosse resolvido.',
    value: 'no'
  }
];

const contactOptions = [
  {
    label: 'E-mail',
    value: 'email'
  },
  {
    label: 'WhatsApp',
    value: 'whatsApp'
  },
  {
    label: 'Telefone',
    value: 'phone'
  },
  {
    label: 'Tanto faz',
    value: 'any'
  },
  {
    label: 'Outro',
    value: 'other'
  }
];

const acceptContactOptions = [
  {
    label: 'Sim',
    value: 'yes'
  },
  {
    label: 'Não',
    value: 'no'
  }
];

const SectionTwo = ({
  contactByPhone,
  contactByApp,
  contactByWhatsapp,
  contactByChatbot,
  contactByWebpage,
  elapsedTime,
  contactChannel,
  incentiveText,
  acceptContact,
  contact
}) => {
  const fieldSchema = Yup.object().shape({
    contactByPhone: Yup.string().required(
      'Por favor informe seu nível de interesse'
    ),
    contactByApp: Yup.string().required(
      'Por favor informe seu nível de interesse'
    ),
    contactByWhatsapp: Yup.string().required(
      'Por favor informe seu nível de interesse'
    ),
    contactByChatbot: Yup.string().required(
      'Por favor informe seu nível de interesse'
    ),
    contactByWebpage: Yup.string().required(
      'Por favor informe seu nível de interesse'
    ),
    elapsedTime: Yup.string().required(
      'Por favor informe o tempo que estaria disposto a aguardar por uma resposta'
    ),
    contactChannel: Yup.string().required(
      'Por favor informe um canal por onde gostaria ser contatado'
    ),
    incentiveText: Yup.string().required('Este campo é requerido'),
    acceptContact: Yup.string().required(
      'Por favor informe se gostaria ser contatado'
    ),
    contact: Yup.string().required('Por favor informe um meio de contato')
  });

  const formik = useFormik({
    initialValues: {
      contactByPhone: contactByPhone || '',
      contactByApp: contactByApp || '',
      contactByWhatsapp: contactByWhatsapp || '',
      contactByChatbot: contactByChatbot || '',
      contactByWebpage: contactByWebpage || '',
      elapsedTime: elapsedTime || '',
      contactChannel: contactChannel || '',
      incentiveText: incentiveText || '',
      acceptContact: acceptContact || '',
      contact: contact || ''
    },
    validationSchema: fieldSchema,
    onSubmit: (data) => console.log(data) // onSubmit(data)
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <>
      <Box mb={4}>
        <Typography mb={2} variant="h4">
          Imagine que houvesse um canal para falar com os responsáveis pelo
          problema da sua comunidade. Quão interessad@ você estaria nas opções
          abaixo?
        </Typography>
      </Box>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <InterestQuestion
                name="contactByPhone"
                values={values}
                errors={errors}
                touched={touched}
                options={options}
                getFieldProps={getFieldProps}
                label="SAC - Número de telefone para ligar e conversar com um atendente que anotaria suas reclamações e enviaria para os responsáveis."
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <InterestQuestion
                name="contactByApp"
                values={values}
                errors={errors}
                touched={touched}
                options={options}
                getFieldProps={getFieldProps}
                label="APP - Um aplicativo onde você colocaria fotos e detalhes sobre os seu problema e enviaria diretamente para os responsáveis, podendo interagir com outras pessoas do seu bairro que também passam pelo mesmo problema."
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <InterestQuestion
                name="contactByWhatsapp"
                values={values}
                errors={errors}
                touched={touched}
                options={options}
                getFieldProps={getFieldProps}
                label="Canal via WhatsApp - Onde você trocaria mensagens com um atendente virtual, podendo enviar fotos e áudios e este enviaria suas informações para os responsáveis por resolvê-las"
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <InterestQuestion
                name="contactByChatbot"
                values={values}
                errors={errors}
                touched={touched}
                options={options}
                getFieldProps={getFieldProps}
                label="Chat bot - Um chat automático, um robô que coletaria suas informações e enviaria para os responsáveis por resolvê-las"
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <InterestQuestion
                name="contactByWebpage"
                values={values}
                errors={errors}
                touched={touched}
                options={options}
                getFieldProps={getFieldProps}
                label="Pagina online - Uma página online onde você preencheria as informações sobre o seu problema e estas seriam enviadas para os responsáveis"
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl
                error={Boolean(touched['elapsedTime'] && errors['elapsedTime'])}
              >
                <RadioGroupForm
                  name="elapsedTime"
                  label="Qual período de tempo você estaria disposto a aguardar por uma resposta por parte dos responsáveis?"
                  values={values}
                  touched={touched}
                  errors={errors}
                  options={timeOptions}
                  fieldProps={getFieldProps('elapsedTime')}
                />
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl
                error={Boolean(
                  touched['contactChannel'] && errors['contactChannel']
                )}
              >
                <RadioGroupForm
                  name="contactChannel"
                  label=" Por qual canal gostaria de ser contatad@ quando a resposta chegar?"
                  values={values}
                  touched={touched}
                  errors={errors}
                  options={contactOptions}
                  fieldProps={getFieldProps('contactChannel')}
                />
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={1} variant="h6">
                O que você acredita ser um incentivo para que você compartilhe
                os seus problemas conosco? O que você gostaria de ganhar por
                isso?
              </Typography>
              <TextField
                name="incentiveText"
                type="text"
                multiline
                fullWidth
                minRows={3}
                placeholder="Descreva aqui qual seria um incentivo para que você compartilhe os seus problemas conosco"
                {...getFieldProps('incentiveText')}
                error={Boolean(touched.incentiveText && errors.incentiveText)}
                helperText={touched.incentiveText && errors.incentiveText}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl>
                <RadioGroupForm
                  name="acceptContact"
                  label="Em caso de dúvidas no preenchimento das respostas, podemos entrar em contato com você?"
                  values={values}
                  touched={touched}
                  errors={errors}
                  options={acceptContactOptions}
                  fieldProps={getFieldProps('acceptContact')}
                />
              </FormControl>
            </CardContent>
          </Card>

          {values['acceptContact'] === 'yes' ? (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography mb={1} variant="h6">
                  Caso tenha respondido sim, por favor informe seu nome, e-mail
                  ou número telefone/ WhatsApp.
                </Typography>
                <TextField
                  name="contact"
                  type="text"
                  fullWidth
                  placeholder="Informe o meio de contato"
                  {...getFieldProps('contact')}
                  error={Boolean(touched.contact && errors.contact)}
                  helperText={touched.contact && errors.contact}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </CardContent>
            </Card>
          ) : null}

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" type="primary" size="large">
              Avanzar
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
};

SectionTwo.propTypes = {
  contactByPhone: PropTypes.string,
  contactByApp: PropTypes.string,
  contactByWhatsapp: PropTypes.string,
  contactByChatbot: PropTypes.string,
  contactByWebpage: PropTypes.string,
  elapsedTime: PropTypes.string,
  contactChannel: PropTypes.string,
  incentiveText: PropTypes.string,
  acceptContact: PropTypes.string,
  contact: PropTypes.string
};

export default SectionTwo;
