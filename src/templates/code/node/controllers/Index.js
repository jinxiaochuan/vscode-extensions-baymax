const BaseController = require('../base/BaseController');

class IndexController extends BaseController {
  async getIndexHtml(ctx) {
    await ctx.render('vscode-snippets/index.html');
  }
}

module.exports = IndexController;
