/**
 * Very very basic tests for visualization of bachelor's degrees.
 *
 * Copyright 2014 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Sam Pottinger
 */


describe('disciplines visualization', function() {

  var TEST_DISCIPLINE_ORDER = [
    "Art / humanities other",
    "Bio, agricult, and enviro sci"
  ];

  var TEST_DATA = {
      "Art / humanities other": {
          "earnings": {
              "by_gender": {
                  "men": 118,
                  "women": 88
              },
              "by_ethnicity": {
                "asian": 69,
                  "black_or_african_american": 100,
                  "hispanic_or_latino": 90,
                  "white_not_hispanic": 87
              },
              "total": 100
          },
          "size": {
              "by_ethnicity": {
                  "asian": 3.9,
                  "black_or_african_american": 12.8,
                  "hispanic_or_latino": 8.8,
                  "white_not_hispanic": 72.5
              },
              "by_gender": {
                  "men": 44.9,
                  "women": 55.1
              },
              "total": 100
          },
          "unemployment": {
              "by_ethnicity": {
                  "asian": 69,
                  "black_or_african_american": 156,
                  "hispanic_or_latino": 117,
                  "white_not_hispanic": 87
              },
              "by_gender": {
                  "men": 89,
                  "women": 105
              },
              "total": 100
          }
      },
      "Bio, agricult, and enviro sci": {
          "earnings": {
              "by_gender": {
                  "men": 110,
                  "women": 85
              },
              "by_ethnicity": {
                "asian": 69,
                  "black_or_african_american": 100,
                  "hispanic_or_latino": 90,
                  "white_not_hispanic": 87
              },
              "total": 100
          },
          "size": {
              "by_ethnicity": {
                  "asian": 11.4,
                  "black_or_african_american": 5.4,
                  "hispanic_or_latino": 5.6,
                  "white_not_hispanic": 75.6
              },
              "by_gender": {
                  "men": 55.9,
                  "women": 44.1
              },
              "total": 100
          },
          "unemployment": {
              "by_ethnicity": {
                  "asian": 107,
                  "black_or_african_american": 185,
                  "hispanic_or_latino": 146,
                  "white_not_hispanic": 89
              },
              "by_gender": {
                  "men": 100.0,
                  "women": 103
              },
              "total": 100
          }
      }
  };

  var testSVG;

  /**
   * Create test SVG container before each test.
   */
  beforeEach(function() {
    testSVG = d3.select('body').append('svg')
        .attr('id', 'disciplines-vis-target');
  });

  /**
   * Remove test SVG container after each test.
   */
  afterEach(function() {
    testSVG.remove();
  });

  /**
   * Test finding the max for a dataset by gender.
   */
  it('finds maximum value by gender', function() {
    var maxValue = genderMax(
        'earnings',
        d3.map(TEST_DATA),
        TEST_DISCIPLINE_ORDER
    );
    expect(maxValue).toEqual(118);
  });

  it('finds maximum value by ethnicity', function() {
    var maxValue = ethnicityMax(
        'unemployment',
        d3.map(TEST_DATA),
        TEST_DISCIPLINE_ORDER
    );
    expect(maxValue).toEqual(185);
  });

  it('create bars at the bottom of a selection', function() {
    createBottomBars(testSVG, 2);

    var bottomBar = d3.select('.bottom-bar');
    expect(parseInt(bottomBar.attr('x'), 10)).toEqual(SECTION_WIDTH * 2);
  });

  it('create inner display groups', function() {
    createGroups(d3.map(TEST_DATA));
    var groupSelection = d3.selectAll('.discipline-group');
    expect(groupSelection.size()).toBe(2);
  });

  it('creates inner display headers', function() {
    createHeaders();
    expect(d3.selectAll('rect').size()).toEqual(6);
    expect(d3.selectAll('text').size()).toEqual(6);
  });

  it('create text for degrees / fields', function() {
    var group = testSVG.append('g').classed('discipline-group', true);

    group.selectAll('.overview-text').data([
        {key: 'discipline 1'},
        {key: 'discipline 2'}
    ]).enter().append('text').classed('overview-text', true);

    createLeftHeader(true);

    var labels = d3.selectAll('.overview-text');
    labels.each(function(datum) {
      expect(d3.select(this).text()).toEqual(datum.key);
    });
  });

  it('create display for men', function(done) {
    var group = testSVG.append('g').classed('discipline-group', true);

    group.selectAll('.men-display').data([{
      value: {
        earnings: {
          by_gender: {
            men: 118
          }
        }
      }
    }]).enter().append('rect').classed('men-display', true);

    createMenDisplay(
        d3.map(TEST_DATA),
        'earnings',
        true,
        TEST_DISCIPLINE_ORDER
    );

    setTimeout(function() {
      var expected = SECTION_WIDTH - SECTION_PADDING;
      var actual = parseInt(d3.select('.metric-bar').attr('width'), 10);
      expect(expected).toEqual(actual);
      done();
    }, 100);
  });

  it('create display for women', function(done) {
    var group = testSVG.append('g').classed('discipline-group', true);

    group.selectAll('.women-display').data([{
      value: {
        earnings: {
          by_gender: {
            women: 118
          }
        }
      }
    }]).enter().append('rect').classed('women-display', true);

    createWomenDisplay(
        d3.map(TEST_DATA),
        'earnings',
        true,
        TEST_DISCIPLINE_ORDER
    );

    setTimeout(function() {
      var expected = SECTION_WIDTH - SECTION_PADDING;
      var actual = parseInt(d3.select('.metric-bar').attr('width'), 10);
      expect(expected).toEqual(actual);
      done();
    }, 100);
  });

  it('create bars for ethnic groups', function(done) {
    var group = testSVG.append('g').classed('discipline-group', true);

    var testObj = {
      value: {
        earnings: {
          by_ethnicity: {
            white_not_hispanic: 100,
            asian: 75,
            black_or_african_american: 50,
            hispanic_or_latino: 25
          }
        }
      }
    };

    group.selectAll('.white-bar').data([testObj]).enter().append('rect')
        .classed('white-bar', true);

    group.selectAll('.asian-bar').data([testObj]).enter().append('rect')
        .classed('asian-bar', true);

    group.selectAll('.black-bar').data([testObj]).enter().append('rect')
        .classed('black-bar', true);

    group.selectAll('.hispanic-bar').data([testObj]).enter().append('rect')
        .classed('hispanic-bar', true);

    createEthnicityDisplay(
        d3.map(TEST_DATA),
        'earnings',
        true,
        TEST_DISCIPLINE_ORDER
    );

    setTimeout(function() {
      var availWidth = SECTION_WIDTH - SECTION_PADDING - ETHNICITY_BAR_PADDING;

      var expected = availWidth;
      var actual = parseFloat(d3.select('.white-bar').attr('width'));
      expect(expected).toEqual(actual);

      expected = availWidth * 0.75;
      actual = parseFloat(d3.select('.asian-bar').attr('width'));
      expect(expected).toEqual(actual);

      expected = availWidth * 0.50;
      actual = parseFloat(d3.select('.black-bar').attr('width'));
      expect(expected).toEqual(actual);

      expected = availWidth * 0.25;
      actual = parseFloat(d3.select('.hispanic-bar').attr('width'));
      expect(expected).toEqual(actual);
      
      done();
    }, 100);
  });

});
