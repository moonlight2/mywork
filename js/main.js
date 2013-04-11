
window.Wine = Backbone.Model.extend({
    urlRoot: 'api/wines',
    defaults: {
        "id": null,
        "name": "",
        "grapes": "",
        "country": "USA",
        "region": "California",
        "year": "",
        "description": "",
        "picture": ""
    }
});

window.WineList = Backbone.Collection.extend({
    model: Wine,
    url: 'api/wines'
});


window.WineListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
        this.model.bind('reset', this.render, this);
        this.model.bind('add', function(wine) {
            $(this.el).append(new WineListItemView({model: wine}).render().el);
        });
    },
    render: function() {
        _.each(this.model.models, function(wine) {
            $(this.el).append(new WineListItemView({model: wine}).render().el);
        }, this);
        return this;
    }
});

window.WineListItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tpl-wine-list-item').html()),
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.close, this);
    },
    close: function() {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

window.WineView = Backbone.View.extend({
    template: _.template($('#tpl-wine-details').html()),
    initialize: function() {
        this.model.bind('change', this.render, this);
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        //'change input': 'change',
        'click .save': 'saveWine',
        'click .delete': 'deleteWine'
    },
    saveWine: function() {
        this.model.set({
            name: $('#name').val(),
            grapes: $('#grapes').val(),
            country: $('#country').val(),
            region: $('#region').val(),
            year: $('#year').val(),
            description: $('#description').val()
        });
        if (this.model.isNew()) {
            var self = this;
            app.wines.create(this.model, {
                success: function() {
                    app.navigate('wines/' + self.model.id, false);
                }
            });
        } else {
            this.model.save({
                success: function() {
                    alert('Model ' + this.model.name + 'daved');
                }
            });
        }
        return false;
    },
    deleteWine: function() {
        this.model.destroy({
            success: function() {
                alert('Destroyed!');
                window.history.back();
            }
        });
        return false;
    },
    change: function(event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        this.model.set({'name': target.value});
        if (this.model.isNew()) {
            app.wines.create(this.model);
        } else {
            this.model.save();
        }
    },
    close: function() {
        $(this.el).unbind();
        $(this.el).remove();
    }
});


window.HeaderView = Backbone.View.extend({

    template:_.template($('#tpl-header').html()),

    initialize:function () {
        this.render();
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "click .new":"newWine"
    },

    newWine:function (event) {
        app.navigate('wines/new', true);
        return false;
    }
});

//var header = new HeaderView();


var AppRouter = Backbone.Router.extend({
    routes: {
        "": "wineList",
        "wines/new": "newWine",
        "wines/:id": "wineDetails",
    },
    initialize: function(){
        $('#header').html(new HeaderView().render().el);
    },
    wineList: function() {
        this.wines = new WineList(); //model

        this.winesView = new WineListView({model: this.wines});
        //this.wines.fetch(); // get data from server
        var self = this;
        this.wines.fetch({
             success:function () {
                self.wineListView = new WineListView({model:self.wines});
                $('#sidebar').html(self.wineListView.render().el);
                if (self.requestedId) self.wineDetails(self.requestedId);
            }
        });
        $('#sidebar').html(this.winesView.render().el);
    },
    newWine: function() {
        if (app.wineView) app.wineView.close();
        app.wineView = new WineView({model:new Wine()});
        $('#main-content').html(app.wineView.render().el);
    },
    wineDetails: function(id) {

        this.wine = this.wines.get(id); //model
        this.wineView = new WineView({model: this.wine});
        //console.log(this.wineView);
        $('#main-content').html(this.wineView.render().el);
    }
});




var app = new AppRouter();
Backbone.history.start();
