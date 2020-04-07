module.exports = {
    apps : [{
        name        : "yanpb",
        script      : "./__sapper__/build/index.js",
        watch       : true,
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_ENV": "production",
            "DATA_ROOT": __dirname + "/data"
        }
    }],
    deploy: {
        production: {
            user: 'yanpb',
            host: [process.env.DEPLOY_IP],
            ref: 'origin/master',
            repo: 'git@github.com:mrferos/yanpb.git',
            path: '/home/yanpb/yapb',
            'post-deploy': 'source ~/.env && npm i --prod && pm2 startOrRestart pm2.config.js'
        }
    }
};
