module.exports = {
    apps : [{
        name        : "yanpb",
        script      : "./__sapper__/builder/index.js",
        watch       : true,
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_ENV": "production",
            "DATA_ROOT": __dirname + "/data"
        }
    }]
};
