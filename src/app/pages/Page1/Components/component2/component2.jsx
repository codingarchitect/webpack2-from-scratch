import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const page1Component2 = () =>
  (<Card>
    <CardHeader
      title="Panel 1"
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>);

export default page1Component2;
