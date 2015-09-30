import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../client/reducers';
import MainPanel from '../client/containers/MainPanel';
import Sidebar from '../client/containers/Sidebar';
import bodyParser from 'body-parser';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const app = Express();
const port = process.env.PORT || 3002;

app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
   if ('OPTIONS' === req.method) {
      res.sendStatus(200);
   }
   else {
      next();
   }
});

var dev = app.get("env") === 'development';

if (dev) {
   var webpack = require('webpack');
   var webpackDevMiddleware = require('webpack-dev-middleware');
   var webpackHotMiddleware = require('webpack-hot-middleware');
   var config = require('../../webpack.config.dev.js');
   var compiler = webpack(config);
   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: '/public/' }));
   app.use(webpackHotMiddleware(compiler));
}

// Use this middleware to serve up static files built into the public directory
app.use(require('serve-static')(path.join(__dirname, '../../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var supplements = [
    {
      id: 0,
      code: 'car',
      selected: false,
      price: 1200,
      text: 'Med en hyrbil blir semestern en verklig frihetsupplevelse. Du kan resa vart du vill, när du vill. Bokar du hos Ving väljer du själv om du vill hämta upp bilen på flygplatsen eller på hyrbilskontoret. Återlämning av bilen gör du sedan på samma plats, senast samma tid på dygnet som när du hämtade ut bilen. Givetvis ingår fri körsträcka, stöldförsäkring och CDW (självriskreducering vid vagnskada). Boka nu, så finns bilen klar när du vill ha den.',
      heading: 'Hyrbil',
      imageUrl: 'http://images1.ving.se/images/SupplementGroup/CAR1001_1_52.jpg?v=1'
    },
    {
      id: 1,
      code: 'ftl',
      selected: false,
      price: 240,
      text: 'Nyfiken på att titta ut? Är det viktigt att kunna sträcka lite extra på benen när du sitter på flyget? Välj vad som passar ditt resesällskaps önskemål och få en resa helt anpassad efter era behov.',
      heading: 'Sittplats ombord',
      imageUrl: 'http://images1.ving.se/images/SupplementGroup/CAR1001_1_52.jpg?v=1'
    },
    {
      id: 2,
      code: 'gol',
      selected: true,
      price: 890,
      text: 'Välj om du vill hämta/lämna bilen på flygplatsen eller i anslutning till ditt hotell. Väljer du hotellet kommer du antingen att kunna hämta ut bilen direkt på hotellet eller på närmast liggande hyrbilskontor. Besked om utlämning får du vid ankomst till hotellet.',
      heading: 'Golf',
      imageUrl: 'http://images1.ving.se/images/SupplementGroup/CAR1001_1_52.jpg?v=1'
    }
]

// This is fired every time the server side receives a request
app.get('/standalone', function (req, res) {
    // Create a new Redux store instance
  const store = createStore(rootReducer, {save:false,supplements}); // pass initial state

  // Render the component to a string
  const mainhtml = React.renderToString(
    <Provider store={store}>
      {() => <MainPanel />}
    </Provider>
  );

  // Render the component to a string
  const sidebarhtml = React.renderToString(
    <Provider store={store}>
      {() => <Sidebar />}
    </Provider>
  );

  // Grab the initial state from our Redux store
  const initialState =  store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(mainhtml, sidebarhtml, initialState));
});

function renderFullPage(html, sidebarhtml, initialState) {
  return `
   <!doctype html>
   <html>
      <head>
         <title>TODO</title>
         ${dev ? '' : '<link rel="stylesheet" type="text/css" href="client.css">'}
      </head>
      <body class="two-column">
         <div class="left-panel panel">
            <div id="redux-sidebar" class="todoapp sidebar">${sidebarhtml}</div>
         </div>
         <div class="main-panel panel">
            <div id="redux-main" class="todoapp">${html}</div>
         </div>
         <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
         </script>
         ${dev ? '<script src="public/bundle.js"></script>' : '<script src="/bundle.js"></script>'}
      </body>
   </html>
    `;
}

app.get('/sidebar', function (req, res) {
   const store = createStore(rootReducer, {save:false,supplements});
   const html = `<div id="redux-sidebar">${React.renderToString(
      <Provider store={store}>
         {() => <Sidebar />}
      </Provider>
   )}</div>`
   const state = JSON.stringify(store.getState());
   res.json({html, state});
});


app.get('/main', function (req, res) {
  const store = createStore(rootReducer, {save:false,supplements});
  const html = `<div id="redux-main">${React.renderToString(
     <Provider store={store}>
        {() => <MainPanel />}
     </Provider>
  )}</div>`
  const state = JSON.stringify(store.getState());
  res.json({html, state});
});

app.post('/save', function (req, res) {
   supplements = req.body.supplements;
   setTimeout(() => res.json({message: 'ok'}), 1000);
});

app.listen(port);
