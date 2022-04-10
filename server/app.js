const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require("path");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger/swagger.json');

const middleware = require('./middleware/index');

const productsRouter = require('./api/routes/productRoute');
const typeProductsRouter = require('./api/routes/typeProductRoute');
const suppliesRouter = require('./api/routes/suppliesRoute');
const purchaseSuppliesRouter = require('./api/routes/purchaseSuppliesRoute');
const logInRouter = require('./api/routes/logInRoute');
const permissionsRouter = require('./api/routes/permissionRoute');
const flavorsRouter = require('./api/routes/flavorRoute');
const familyFlavorsRouter = require('./api/routes/familyFlavorsRoute');
const chamberFlavorDispatchRouter = require('./api/routes/chamberFlavorDispatchRoute');
const productionsRouter = require('./api/routes/productionRoute');
const franchiseRouter = require('./api/routes/franchiseRoute');
const salesRouter = require('./api/routes/salesRoute');
const clientsRouter = require('./api/routes/clientRoute');
const employeeAssistanceRouter = require('./api/routes/employeeAssistanceRoute')
const employeeRouter = require('./api/routes/employeeRoute'); 
const fingerPrintRouter = require('./api/routes/fingerPrintsRoute'); 
const assistanceFingerRouter = require('./api/routes/assistenceFingerRoute'); 
const salesReportRouter = require('./api/routes/salesReportRoute'); 
const licensesRouter = require('./api/routes/licenseRoute'); 
const advancesRouter = require('./api/routes/advancesRoute');
const serviceTestRoute = require('./api/routes/serviceTestRoute');
const salariesRoute = require('./api/routes/salariesRoute');
const dayOffRouter = require('./api/routes/dayOffRoute');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('web_client/build'));
app.use(express.static(path.join(__dirname, './api/images/productDBImages')));

app.get("/app/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../web_client/build/index.html"));
});

/** Swagger */
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Routes apis and errors */

app.use('/api', logInRouter);
app.use('/api', permissionsRouter);
app.use('/api', productsRouter);
app.use('/api', typeProductsRouter);
app.use('/api', suppliesRouter);
app.use('/api', purchaseSuppliesRouter);
app.use('/api', flavorsRouter);
app.use('/api', familyFlavorsRouter);
app.use('/api', chamberFlavorDispatchRouter);
app.use('/api', productionsRouter);
app.use('/api', clientsRouter);
app.use('/api', employeeRouter);
app.use('/api', fingerPrintRouter);
app.use('/api', licensesRouter);
app.use('/api', salesRouter);
app.use('/api', franchiseRouter);
app.use('/api', salesReportRouter);
app.use('/api', assistanceFingerRouter);
app.use('/api', employeeAssistanceRouter)
app.use('/api', advancesRouter);
app.use('/api', serviceTestRoute);
app.use('/api', salariesRoute);
app.use('/api', dayOffRouter);

app.use(middleware.error404);
app.use(middleware.error500);

module.exports = app;