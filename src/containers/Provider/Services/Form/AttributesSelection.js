/**
 * Created by vladtomsa on 29/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Info from 'mdi-material-ui/Information';
import {AVAILABLE_DATA_TYPES} from "helpers/getFormFieldsFromJSONConfig";

const AttributesSelection = (props) => {
  const {attributeTypes, fields, meta, t} = props;

  const createdFields = fields.getAll() || [];

  const { error, submitFailed } = meta;

  const areAllAttributesSelected = attributeTypes.length === fields.length;

  const selectAll = () => {
    attributeTypes.forEach((attribute) => {
      const associationIndex = createdFields.findIndex((field) => field === attribute.name);

      if (associationIndex === -1) {
        fields.push(attribute.name);
      }
    })
  };

  return (
    <FormControl component="fieldset" required error={!!(error && submitFailed)} variant="outlined">
      <FormLabel component="legend">{ t('REQUIRED_ATTRIBUTES') }</FormLabel>

      {/*<br />*/}

      {/*<Typography variant="caption" className="flex align-center">*/}
        {/*<Info />&nbsp;*/}
        {/*<span>{ t('INCLUDES_ATTRIBUTES_DESCRIPTION') }</span>*/}
      {/*</Typography>*/}

      <br />

      <FormGroup>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!areAllAttributesSelected}
                  onChange={selectAll}
                />
              }
              label={t('SELECT_ALL')}
            />
          </Grid>
          {
            attributeTypes.map((attribute) => {
              const associationIndex = createdFields.findIndex((field) => field === attribute.name);

              return (
                <Grid key={attribute.name} item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={associationIndex !== -1 }
                        onChange={
                          () => {
                            associationIndex === -1
                              ? fields.push(attribute.name)
                              : fields.remove(associationIndex);
                          }
                        }
                      />
                    }
                    label={t(attribute.name)}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </FormGroup>

      {
        error && submitFailed
          ? <FormHelperText>{ t(error) }</FormHelperText>
          : null
      }
    </FormControl>
  );
};

AttributesSelection.propTypes = {
  attributeTypes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default AttributesSelection;