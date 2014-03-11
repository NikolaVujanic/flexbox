module flexbox {

    export module view {
        export class FlexContainer {
            items: any;
            cPropsDefault: any;
            cPropsCurrent: any;
            flexDirectionOptions: any;
            flexWrapOptions: any;
            justifyContentOptions: any;
            alignItemsOptions: any;
            alignContentOptions: any;
            alignSelfOptions: any;
            iPropsDefault: any;
            defaultBtnText: any;
            noItems: any;
            allAreFixed: any;
            allAreFlexy: any;

            constructor() {

                this.items = ko.observableArray([]);

                this.noItems = ko.computed(function() {
                    var array = this.items();
                    console.log(array);
                    if (array.length) {
                        return false;
                    }
                    else {
                        return true;
                    }

                }, this);
                //add all of the flexbox container properties

                this.iPropsDefault = {
                    order: ko.observable("1"),
                    flexGrow: ko.observable("0"),
                    flexShrink: ko.observable("0"),
                    flexBasis: ko.observable("0"),
                    alignSelf: ko.observable("center"),
                    width: ko.observable("300px"),
                    height: ko.observable("250px"),
                    backgroundColor: "blue",
                    margin: "10px"
                };

                this.defaultBtnText = "Sync Items with Defaults"

                //UI edits default props in 

                this.cPropsDefault = {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: "#0074d9"
                };

                this.cPropsCurrent = {
                    display: ko.observable("flex"),
                    flexDirection: ko.observable("row"),
                    flexWrap: ko.observable("wrap"),
                    justifyContent: ko.observable("center"),
                    alignItems: ko.observable("center"),
                    alignContent: ko.observable("center"),
                    width: ko.observable("100%")

                };

                this.flexDirectionOptions = ['row', 'column'];
                this.flexWrapOptions = ['wrap', 'nowrap'];
                this.justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
                this.alignItemsOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
                this.alignContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
                this.alignSelfOptions = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'inherit'];

                this.allAreFixed = ko.observable(true);
                this.allAreFlexy = ko.observable(false);

            } //end constructor


            newItem(): void {
                var index = this.getItemIndex();
                var newItem = new flexbox.model.FlexItem(this, index);

                this.items.push(newItem);
                //set up new param to be flexy or fixed
                //figure out a better way to be passing these parameters to the new item
                //maybe just pass the one value, maybe consolidate the props in Container too

            }

            oneLessItem(): void {

                this.items.pop();

            }

            getItemIndex(): number {
                var currentLength = this.items().length;
                return currentLength + 1;
            }

            makeAllFixed(): void {

                this.allAreFixed(true);
                this.allAreFlexy(false);
                var array = this.items();
                for (var i = 0; i < array.length; i++) {
                    array[i].makeFixedWidth();

                }

            }

            makeAllFlexy(): void {

                this.allAreFixed(false);
                this.allAreFlexy(true);
                var array = this.items();
                for (var i = 0; i < array.length; i++) {
                    array[i].makeFlexyWidth();

                }

            }

            resetItemProps(): void {
                var array = this.items();
                for (var i = 0; i < array.length; i++) {
                    array[i].resetProps();

                }
            }

            destroyItem(index): void {
                var self = this;
                self.items.splice((index - 1), 1);
                (function() {
                    var array = self.items();
                    for (var i = 0; i < array.length; i++) {
                        var newIndex = i + 1;
                        var stringIndex = newIndex.toString();
                        array[i].index(stringIndex);
                    }
                })();
            }

            makeHolyGrail(): void {
                var text = "The main idea behind the flex layout is to give the container the ability to alter its items' width/height (and order) to best fill the available space (mostly to accomodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space, or shrinks them to prevent overflow.";
                var text2  = text + text + text;
                var index = this.getItemIndex();
                this.items([]);
                this.items.push(
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "98%", alignSelf: "center", height: "140px", content: "HEADER" }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height:"auto", content: text2 }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height:"auto", content: text }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height:"auto", content: text2 }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "98%", alignSelf: "center", height: "140px", content: "FOOTER" })
                    );
                this.cPropsCurrent.alignItems("stretch");

            }

            responsiveNav(): void {
                var index = this.getItemIndex();
                this.items([]);
                this.items.push(
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height: "50px", margin: "2px", content: "Home" }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height: "50px", margin: "2px", content: "About" }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height: "50px", margin: "2px", content: "Contact" }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height: "50px", margin: "2px", content: "Portfolio" }),
                    new flexbox.model.FlexItem(this, index++, { isFlexyWidth: true, flexGrow: "1", flexShrink: "0", flexBasis: "200px", height: "50px", margin: "2px", content: "Blog" })
                    );

            }

        } //end class


    }

}
