import React, { useEffect } from 'react';
// router
import { useHistory } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  TextField,
  FormControl,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFormData,
  fetchFormList,
  setStep,
  setFilledForm
} from '../../store/slices/form';
// components
import {
  RadioGroupForm,
  SelectForm,
  CheckboxGroupForm
} from '../../components';

const genderOptions = [
  {
    label: 'Feminino',
    value: 'female'
  },
  {
    label: 'Masculino',
    value: 'male'
  },
  {
    label: 'Prefiro não responder',
    value: 'other'
  }
];

const schoolLevelOptions = [
  {
    label: 'Não alfabetizado',
    value: 'noLiterate'
  },
  {
    label: 'Ensino fundamental',
    value: 'basicSchool'
  },
  {
    label: 'Ensino médio completo',
    value: 'completeHighSchool'
  },
  {
    label: 'Ensino médio incompleto',
    value: 'incompleteHighSchool'
  },
  {
    label: 'Ensino superiorcompleto',
    value: 'completeUniversity'
  },
  {
    label: 'Ensino superior incompleto',
    value: 'incompleteUniversity'
  },
  {
    label: 'Pós-Graduação',
    value: 'postgraduate'
  },
  {
    label: 'Mestrado',
    value: 'masterDegree'
  },
  {
    label: 'Doutorado',
    value: 'doctorateDegree'
  },
  {
    label: 'Pós-Doutorado',
    value: 'postdoctoral'
  }
];

const problemAreaOptions = [
  {
    label: 'Financeiro',
    value: 'financial'
  },
  {
    label: 'Alimentação',
    value: 'feeding'
  },
  {
    label: 'Saúde',
    value: 'health'
  },
  {
    label: 'Educação',
    value: 'education'
  },
  {
    label: 'Desigualdade de gênero',
    value: 'genderInequality'
  },
  {
    label: 'Saneamento Básico',
    value: 'basicSanitation'
  },
  {
    label: 'Energia Elétrica',
    value: 'electricPower'
  },
  {
    label: 'Desemprego',
    value: 'unemployment'
  },
  {
    label: 'Tecnologia',
    value: 'technology'
  },
  {
    label: 'Imigração',
    value: 'immigration'
  },
  {
    label: 'Infraestrutura, Moradia e Mobilidade',
    value: 'infraestruture'
  },
  {
    label: 'Poluição',
    value: 'pollution'
  },
  {
    label: 'Meio Ambiente',
    value: 'environment'
  },
  {
    label: 'Violência',
    value: 'violence'
  },
  {
    label: 'Discriminação racial',
    value: 'racialDiscrimination'
  }
];

const problemResponsibleOptions = [
  {
    label: 'Governo',
    value: 'government'
  },
  {
    label: 'Empresas',
    value: 'companies'
  },
  {
    label: 'A própria comunidade',
    value: 'community'
  }
];

const contactResponsibleOptions = [
  {
    label: 'Sim',
    value: 'yes'
  },
  {
    label: 'Não',
    value: 'no'
  }
];

const SectionOne = () => {
  const fieldSchema = Yup.object().shape({
    gender: Yup.string().required('Por favor informe seu gênero'),
    age: Yup.number().required('Por favor informe sua idade'),
    schoolLevel: Yup.string().required('Por favor informe sua escolaridade'),
    problem: Yup.string().required(
      'Por favor descreva o problema da sua comunidade'
    ),
    problemArea: Yup.array().min(
      1,
      'Por favor selecione ao menos uma área do problema'
    ),
    problemSolution: Yup.string().required(
      'Por favor descreva como você resolve o problema atualmente'
    ),
    problemCause: Yup.string().required(
      'Por favor descreva brevemente a causa do problema'
    ),
    problemResponsible: Yup.array().min(
      1,
      'Por favor informe ao menos um resposável'
    ),
    contactedResponsible: Yup.string().required(
      'Por favor informe se já tentou contatar os responsáveis'
    )
  });

  const {
    formData: {
      gender,
      age,
      schoolLevel,
      problem,
      problemArea,
      problemSolution,
      problemCause,
      problemResponsible,
      contactedResponsible,
      problemContacting
    }
  } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const history = useHistory();

  const getContactedResponsible = (data) => {
    if (data === undefined || data === null) return '';

    if (data === true) return 'yes';

    return 'no';
  };

  const getInitialProblemArea = (data) => {
    const values = data && data.split(',');
    return values && values.length > 0
      ? problemAreaOptions.filter((item) => values.includes(item.value))
      : [];
  };

  const formik = useFormik({
    initialValues: {
      gender: gender || '',
      age: age || '',
      schoolLevel: schoolLevel || '',
      problem: problem || '',
      problemArea: getInitialProblemArea(problemArea),
      problemSolution: problemSolution || '',
      problemCause: problemCause || '',
      problemResponsible:
        (problemResponsible && problemResponsible.split(',')) || [],
      contactedResponsible: getContactedResponsible(contactedResponsible),
      problemContacting: problemContacting || ''
    },
    validationSchema: fieldSchema,
    enableReinitialize: true,
    onSubmit: (data) => {
      dispatch(setFilledForm(2));
      dispatch(
        changeFormData({
          ...data,
          problemArea: data.problemArea.map((item) => item.value).toString(),
          problemResponsible: data.problemResponsible.toString(),
          contactedResponsible: data.contactedResponsible === 'yes'
        })
      );
      history.push('/form/section-two');
    }
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleProblemResponsibleChange = (event) => {
    if (event.target.checked) {
      return setFieldValue('problemResponsible', [
        ...values['problemResponsible'],
        event.target.name
      ]);
    }
    return setFieldValue(
      'problemResponsible',
      values['problemResponsible'].filter((item) => item !== event.target.name)
    );
  };

  useEffect(() => {
    dispatch(fetchFormList());
    dispatch(setStep(0));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box mb={2}>
        <Typography mb={2} align="center" variant="h4">
          Quero contar meu problema!
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
          PS: Caso queira receber um e-mail com o ODS (Objetivo de
          Desenvolvimento Sustentável) em que seu problema mais se encaixa, não
          esquece de deixá-lo registrado na penúltima pergunta deste formulário.
        </Typography>
      </Box>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl
                error={Boolean(touched['gender'] && errors['gender'])}
              >
                <RadioGroupForm
                  name="gender"
                  label="Qual o seu gênero?"
                  values={values}
                  touched={touched}
                  errors={errors}
                  options={genderOptions}
                  fieldProps={getFieldProps('gender')}
                />
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container>
                <Grid item sm={4} md={4}>
                  <Typography mb={1} variant="h6">
                    Qual a sua idade?
                  </Typography>
                  <TextField
                    fullWidth
                    name="age"
                    type="number"
                    placeholder="Informe sua idade"
                    {...getFieldProps('age')}
                    error={Boolean(touched.age && errors.age)}
                    helperText={touched.age && errors.age}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container>
                <Grid item sm={4} md={4}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={Boolean(
                      touched['schoolLevel'] && errors['schoolLevel']
                    )}
                  >
                    <SelectForm
                      name="schoolLevel"
                      label="Qual o sua escolaridade?"
                      values={values}
                      touched={touched}
                      errors={errors}
                      options={schoolLevelOptions}
                      fieldProps={getFieldProps('schoolLevel')}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={1} variant="h6">
                Pare agora um momento e olhe ao seu redor, qual você acredita
                ser o maior problema que você e/ou sua comunidade enfrentam
                neste momento?
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={3}
                name="problem"
                type="string"
                placeholder="Descreva aqui o problema da sua comunidade"
                {...getFieldProps('problem')}
                error={Boolean(touched.problem && errors.problem)}
                helperText={touched.problem && errors.problem}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={1} variant="h6">
                Qual das grandes áreas abaixo você acredita que o seu problema
                mais se encaixa? Caso fique na dúvida você pode marcar mais do
                que uma opção
              </Typography>
              <Autocomplete
                multiple
                filterSelectedOptions
                options={problemAreaOptions}
                value={values['problemArea']}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option, value) =>
                  value.value === option.value
                }
                onChange={(e, v) => setFieldValue('problemArea', v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="problemArea"
                    variant="outlined"
                    placeholder="Selecione a(s) área(s) do problema"
                    error={Boolean(touched.problemArea && errors.problemArea)}
                    helperText={touched.problemArea && errors.problemArea}
                  />
                )}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={1} variant="h6">
                Como você resolve ou tenta resolver esse problema atualmente?
              </Typography>
              <TextField
                name="problemSolution"
                type="text"
                multiline
                fullWidth
                minRows={3}
                placeholder="Descreva a forma como você resolve o problema"
                {...getFieldProps('problemSolution')}
                error={Boolean(
                  touched.problemSolution && errors.problemSolution
                )}
                helperText={touched.problemSolution && errors.problemSolution}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={1} variant="h6">
                O que você acredita ser a causa desse problema?
              </Typography>
              <TextField
                name="problemCause"
                type="text"
                multiline
                fullWidth
                minRows={3}
                placeholder="Descreva a causa do problema"
                {...getFieldProps('problemCause')}
                error={Boolean(touched.problemCause && errors.problemCause)}
                helperText={touched.problemCause && errors.problemCause}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl
                error={Boolean(
                  touched['problemResponsible'] && errors['problemResponsible']
                )}
              >
                <CheckboxGroupForm
                  label="Quem você acredita ser o principal responsável pelo problema que você e/ou sua comunidade enfrentam? Caso você acredite que exista um"
                  values={values['problemResponsible']}
                  touched={touched['problemResponsible']}
                  errors={errors['problemResponsible']}
                  options={problemResponsibleOptions}
                  onChange={handleProblemResponsibleChange}
                >
                  <FormControlLabel
                    label="Outro"
                    control={
                      <Checkbox
                        name="other"
                        checked={Boolean(
                          values['problemResponsible'].find(
                            (item) => item === 'other'
                          )
                        )}
                        onChange={handleProblemResponsibleChange}
                      />
                    }
                  />
                </CheckboxGroupForm>
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <FormControl>
                <RadioGroupForm
                  name="contactedResponsible"
                  label="Você já tentou contatar os responsáveis por resolvê-los?"
                  values={values}
                  touched={touched}
                  errors={errors}
                  options={contactResponsibleOptions}
                  fieldProps={getFieldProps('contactedResponsible')}
                />
              </FormControl>
            </CardContent>
          </Card>

          {values['contactedResponsible'] === 'yes' ? (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography mb={1} variant="h6">
                  Se sim, qual o seu maior desafio ao tentar contatar os
                  responsáveis pela resolução deste problema?
                </Typography>
                <TextField
                  name="problemContacting"
                  type="text"
                  multiline
                  fullWidth
                  minRows={3}
                  placeholder="Descreva o maior desafio que teve para contatar os responsáveis"
                  {...getFieldProps('problemContacting')}
                  error={Boolean(
                    touched.problemContacting && errors.problemContacting
                  )}
                  helperText={
                    touched.problemContacting && errors.problemContacting
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </CardContent>
            </Card>
          ) : null}

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" type="primary" size="large">
              Avançar
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
};

SectionOne.propTypes = {
  gender: PropTypes.string,
  age: PropTypes.number,
  schoolLevel: PropTypes.string,
  problem: PropTypes.string,
  problemArea: PropTypes.array,
  problemSolution: PropTypes.string,
  problemCause: PropTypes.string,
  problemResponsible: PropTypes.array,
  contactedResponsible: PropTypes.string,
  problemContacting: PropTypes.string,
  onSubmit: PropTypes.func
};

export default SectionOne;
