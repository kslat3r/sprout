var expect = require('chai').expect;
var Home = require('../app/views/home');
var TestUtils = require("react/addons").addons.TestUtils;

describe('Home', function () {
  var page;

  beforeEach(function () {
    page = TestUtils.renderIntoDocument(<Home/>);
  });

  it('should have a title', function () {
    expect(page.refs.title.getDOMNode().innerText).to.equal('Hello world');
  });
});