const home = (req, res) => {
  res.render('main/home');
};

const about = (req, res) => {
  res.render('main/about');
};

module.exports = {
  home,
  about
};
