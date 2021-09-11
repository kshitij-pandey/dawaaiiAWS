const router = require("express").Router();
const Cluster = require('../controllers/cluster.js');

router.post('/clusterSearch', Cluster.storesInCluster);

module.exports = router;
