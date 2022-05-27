export default class Product {

    /**
     * Constructor which requires a productElement (element), heading text (string), description text (string) and features (array)
     * The Heading text provided will replace the text content of the exising heading element
     * The description text will add description content as a new paragraph
     * The features provided will add the features as list items with an attribute "dataFeatureId"
     */
    constructor(productElement, headingText, descriptionText, image, features) {

        // Object to hold the elements
        this.$elems = {
            product: null,
            heading: null,
            description: null,
            image: null,
            features: null
        };

        // selector classes for the element
        this.selectors = {
            product: 'product',
            productHeading: 'product__heading',
            productDescription: 'product__description',
            productImage: 'product__image',
            features: 'features',
            featureItem: 'features__item',
            dataFeatureId: 'data-feature-id',
        };

        // instantiating the objects with the dom elements
        Object.keys(this.$elems).map((key, index) => {
            var selector = Object.values(this.selectors)[index];
            // set element value to DOM element reference
            this.$elems[key] = productElement.querySelector(`.${selector}`);
        });

        // Checking if heading text provided is valid and the dom element is present before assigning the content
        if (this.IsValid(this.$elems.heading) && this.IsValid(headingText)) {
            this.$elems.heading.textContent = headingText;
        }

        // checking if the description content supplied is valid and the dom element is present before assigning the description content
        if (this.IsValid(this.$elems.description) && this.IsValid(descriptionText)) {
            var $newP = document.createElement("p");
            var textNode = document.createTextNode(descriptionText);

            $newP.appendChild(textNode);
            this.$elems.description.appendChild($newP);
        }

        // checking if the image content supplied is valid and the dom element is present before assigning the image content
        if (this.IsValid(this.$elems.image) && this.IsValid(image)) {
            var $img = document.createElement("img");
            $img.src = image;
            this.$elems.image.appendChild($img);
        }

        // checking if the list content supplied is valid and the dom element is present before assigning the feature content
        if (this.IsValid(this.$elems.features) && this.IsValid(features)) {
            var $list = document.createElement("ul");

            for (var i = 0; i < features.length; i++) {
                if (!this.IsValid(features[i].text))
                    continue;

                var $listItem = document.createElement("li");
                var textNode = document.createTextNode(features[i].text);

                $listItem.classList.add(this.selectors.featureItem);

                if (this.IsValid(features[i].id)) {
                    $listItem.setAttribute(this.selectors.dataFeatureId, features[i].id);
                }

                $listItem.appendChild(textNode);
                $list.appendChild($listItem);
            }

            this.$elems.features.appendChild($list);
        }
    }

    /**
     * gets the current heading text
     */
    getHeadingText() {
        if (this.IsValid(this.$elems.heading)) {
            return this.$elems.heading.textContent;
        }
        return null;
    }
    /**
     * Checks if the feature is existing by comparing it with the attribute "dataFeatureId"
    */
    hasFeature(featureId) {
        if (this.IsValid(this.$elems.features)) {
            var featureListItems = this.$elems.features.querySelectorAll(`.${this.selectors.featureItem}`);

            for (var i = 0; i < featureListItems.length; i++) {
                if (!featureListItems[i].hasAttribute(this.selectors.dataFeatureId))
                    continue;

                var foundFeatureId = featureListItems[i].getAttribute(this.selectors.dataFeatureId);

                if (foundFeatureId === featureId) {
                    return true;
                }
            }
        }

        return false;
    }

    IsValid(reference) {
        return typeof reference != 'undefined' && reference != null;
    }
}