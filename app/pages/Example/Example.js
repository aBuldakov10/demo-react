import React from 'react';

import './Example.scss';
import { contentAcc } from './content';
import imgBg from './space.jpg';
import Accordion from './Accordion/Accordion';

const Example = () => {
  return (
    <>
      {/*Typography*/}
      <div className="block">
        <h2>Typography block</h2>
        <h1>h1 title</h1>
        <h2>h2 title</h2>
        <h3>h3 title</h3>
        <h4>h4 title</h4>
        <h5>h5 title</h5>
        <h6>h6 title</h6>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
          accusantium aspernatur dolorum esse exercitationem possimus reiciendis
          suscipit tempora. Aliquid consequuntur doloremque, illum ipsam placeat
          praesentium quisquam repudiandae vero. Aspernatur, sed.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
          accusantium aspernatur dolorum esse exercitationem possimus reiciendis
          suscipit tempora. Aliquid consequuntur doloremque, illum ipsam placeat
          praesentium quisquam repudiandae vero. Aspernatur, sed.
        </p>

        <a href="/" className="link" title="link" target="">
          Link
        </a>
        <a href="#" className="btn" title="link-btn" target="">
          link btn
        </a>
      </div>

      {/*Images*/}
      <div className="block">
        <h2>Image block</h2>
        <div className="img-bg img-bg--example">
          <img src={imgBg} alt="image" />
        </div>
      </div>

      {/*Accordion*/}
      <Accordion contentAcc={contentAcc} />

      {/*Tabs*/}
      <div className="block">
        <h2>Tabs block</h2>
        <div className="js-tabs tabs">
          <div className="tabs__navigation">
            <a href="#tab-1" className="tabs__navigation-link active">
              tab 1
            </a>
            <a href="#tab-2" className="tabs__navigation-link">
              tab 2
            </a>
          </div>

          <div className="tabs__content">
            <div id="tab-1" className="tab active">
              <div className="js-switch mob-tab-nav collapse-arrow active">
                <h3>Tab 1</h3>
              </div>

              <div className="mob-tab-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci commodi cupiditate dolore facere iure libero magnam
                praesentium quia quisquam, repellat sed voluptatem? Consequatur
                corporis distinctio dolor labore maiores maxime voluptatem.
              </div>
            </div>

            <div id="tab-2" className="tab">
              <div className="js-switch mob-tab-nav collapse-arrow">
                <h3>Tab 2</h3>
              </div>

              <div className="mob-tab-content">
                Curabitur auctor at elit quis sodales. Donec sodales odio lacus,
                sit amet vulputate massa semper eu. Phasellus aliquam congue mi,
                vel consectetur risus tristique quis. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Etiam velit ligula, vehicula
                ac dignissim nec, semper ut ex. Morbi porttitor elementum diam,
                non consequat nibh bibendum vitae. Donec at ipsum imperdiet,
                ultrices arcu et, molestie augue. Maecenas sed lorem eros.
                Aenean finibus leo id lectus sollicitudin tincidunt. Etiam
                auctor, lorem eget rutrum pellentesque, orci odio ultrices
                felis, ut facilisis tortor quam non tellus.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Table*/}
      <div className="block">
        <h2>Table block</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>title 1</th>
                <th>title 2</th>
                <th>title 3</th>
                <th>title 4</th>
                <th>title 5</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
              </tr>
              <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
              </tr>
              <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
              </tr>
              <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/*Form*/}
      <div className="block">
        <h2>Form block</h2>
        <form action="" className="form">
          {/*Radio*/}
          <div className="form__group">
            <label className="radio">
              <input
                className="radio__input"
                name="radio-1"
                type="radio"
                defaultChecked={true}
              />
              <span className="radio__name">radio 1</span>
            </label>

            <label className="radio">
              <input className="radio__input" name="radio-1" type="radio" />
              <span className="radio__name">radio 2</span>
            </label>
          </div>

          {/*Checkbox*/}
          <div className="form__group">
            <label className="checkbox">
              <input
                className="checkbox__input"
                name="check-1"
                type="checkbox"
                defaultChecked={true}
              />
              <span className="checkbox__name">checkbox 1</span>
            </label>

            <label className="checkbox">
              <input
                className="checkbox__input"
                name="check-2"
                type="checkbox"
              />
              <span className="checkbox__name">checkbox 2</span>
            </label>
          </div>

          {/*Input fields*/}
          <div>
            <div className="form__group">
              <label className="form__label">
                <span className="form__label-name">field name</span>
                <input
                  className="form__input"
                  name="username"
                  type="text"
                  placeholder="name"
                />
              </label>
            </div>

            <div className="form__group">
              <label className="form__label">
                <span className="form__label-name">field pass</span>
                <input
                  className="form__input"
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </label>
            </div>

            <div className="form__group">
              <label className="form__label">
                <span className="form__label-name">field textarea</span>
                <textarea
                  className="form__textarea"
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="placeholder"
                />
              </label>
            </div>

            <div className="form__group">
              <div className="form-file">
                <button className="js-form-file-btn form-file__btn btn">
                  <span className="form-file__title">добавить файл</span>
                </button>

                <input
                  className="form-file__input"
                  name="file"
                  type="file"
                  multiple
                />
              </div>
            </div>

            <div className="form__group">
              <label className="form-color">
                <span className="form-color__title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z"
                    />
                  </svg>
                </span>

                <input
                  className="form-color__input"
                  name="color"
                  type="color"
                />
              </label>
            </div>

            <div className="form__group">
              <div className="form-range">
                <span className="form-range__name">field range</span>
                <input
                  className="form-range__input"
                  name="range"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="40"
                />
              </div>
            </div>
          </div>

          {/*Buttons*/}
          <div>
            <button className="btn" type="button">
              button
            </button>
            <button className="btn" type="reset">
              reset
            </button>
            <button className="btn" type="submit">
              submit
            </button>
          </div>

          {/*Select lis*/}
          <fieldset>
            <legend>Select list fieldset with legend</legend>

            <select name="" id="">
              <option defaultValue="0">select item</option>
              <option defaultValue="1">item 1</option>
              <option defaultValue="2">item 2</option>
              <option defaultValue="3">item 3</option>
              <option defaultValue="4">item 4</option>
            </select>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Example;
