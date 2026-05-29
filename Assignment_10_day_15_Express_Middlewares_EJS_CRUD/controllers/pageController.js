export const renderHome = (req, res) => {
    res.render("home", { activePage: "home" });
};

export const renderAbout = (req, res) => {
    res.render("about", { activePage: "about" });
};

export const renderContact = (req, res) => {
    res.render("contact", { activePage: "contact" });
};
