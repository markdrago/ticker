function Marquee() {
    this.text = "";
    this.selector = undefined;
}

Marquee.prototype.setText = function(text) {
    this.text = text;
};

Marquee.prototype.setSelector = function(selector) {
    this.selector = selector;
};

Marquee.prototype.enable = function() {
    $(this.selector).html(this.text);
};

