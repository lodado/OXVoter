# Exmaple

```jsx

import { createContextScope, Scope } from './scope';


const [createDialogContext, createDialogScope] = createContextScope('Dialog');
const [DialogProvider, useDialogContext] = createDialogContext<{ color: string }>('Dialog');

const [createAlertDialogProvider, createAlertDialogScope] = createContextScope(
  'AlertDialog',
  [createDialogScope]
);

const [AlertDialogProvider, useAlertDialogContext] = createAlertDialogProvider<{ color: string }>('AlertDialog');


const alertDialogScope = createAlertDialogScope()
const alertDialogScope2 = createAlertDialogScope()

const DialogContent = (props: { scope: Scope<any>, }) => {
  const { scope } = props

  const { color } = useDialogContext('TabContent', scope);
  const { color: color2 } = useAlertDialogContext('TabContent2', scope);

  return <div>content {color} {color2}</div>;
}

const AlertDialog = () => {

  const scope = alertDialogScope({})
  const scope2 = alertDialogScope2({})
  
  return (
    <AlertDialogProvider scope={scope.__scopeAlertDialog} color="black">
      <AlertDialogProvider scope={scope2.__scopeAlertDialog} color="violet">
        
        <DialogProvider scope={scope2.__scopeAlertDialog} color={'red'}  >
          <DialogProvider  scope={scope.__scopeAlertDialog} color={'brown'} >
              
              <DialogContent scope={scope.__scopeAlertDialog} />
              <DialogContent scope={scope2.__scopeAlertDialog} />
              
              </DialogProvider >  
            </DialogProvider >
      </AlertDialogProvider>
    </AlertDialogProvider>
);
};

export default AlertDialog;

```
