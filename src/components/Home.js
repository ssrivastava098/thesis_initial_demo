import React, { useState, useEffect} from 'react';
import whitelogo from '../static/images/whitelogo.jpg';
import WhiteBoxParamerterPanel from './WhiteBoxParamerterPanel';
import WhiteBoxParamerterPanelTargeted from './WhiteBoxParameterPanelTargeted'
import BlackBoxParamerterPanelTargeted from './BlackBoxParameterPanelTargeted'
import RenderResultsComponent from './RenderResultsComponent'
export default function Home() 
{

    const [selectedModel, setSelectedModel] = useState('');
    const [selectedAttack, setSelectedAttack] = useState(''); // For White Box vs Black Box
    const [selectedTarget, setSelectedTarget] = useState(''); // For Targeted vs Non-Targeted
    const [selectedPerturbation , setSelectedPerturbation] = useState('0.15'); //For Perturbations
    const [selectedSteps, setSelectedSteps] = useState('50');
    const [selectedAlpha, setSelectedAlpha] = useState('');
    const [selectedLearningRate, setLearningRate] = useState(''); // cw_lr
    const [selectedLangrangeMul, setLangrangeMul] = useState(''); //cw_c
    const [selectedConfidence, setConfidence] = useState('');//cw_k
    const [selectedIterations, setIterations] = useState('');//cw_n_itr
    const [selectedImage , setSelectedImage] = useState(''); //For Image on which Attack Happens
    const [selectedTargetImage, setSelectedTargetImage] = useState(''); //The target imagenet category 
    const [attackMethod, setAttackMethod] = useState(''); //For Different types of Attacks in a Single Vertical (for Example:- fgsm, pgd under WhiteBoxAttack)

    const handleSetAttack = (name) => { //FGSM PGD CW
      setAttackMethod(name);
    };

    const handlePerturbaion = (perturb) => { //FGSM Perturbation
      setSelectedPerturbation(perturb);
    };

    const handleSteps = (steps) => { //PGD_Steps
      setSelectedSteps(steps);
    };

    const handleAlpha = (alpha) => { //PGD_Alpha
      setSelectedAlpha(alpha);
    };

    const handleConfidence = (confidence) => { //cw_confidence
      setConfidence(confidence);
    };

    const handleLearningRate = (lr) => { //cw_learning_rate
      setLearningRate(lr);
    };

    const handleLangrangeMul = (c) => { //cw_langrange_mul
      setLangrangeMul(c);
    };

    const handleIterations = (iterations) => { //cw_iterations
      setIterations(iterations);
    };
  
    const handleImage = (img) => { //Handle Source Image; Common Parameters
      setSelectedImage(img);
    };

    const handleTargetImage = (img) => { //This Method is passed to WhiteBoxParamerterTarget.js to alter target image
        setSelectedTargetImage(img);
    };

    useEffect(() => {
      console.log("Selected Perturbation:", selectedPerturbation);
    }, [selectedPerturbation]);
  
    useEffect(() => {
      console.log("Selected Image:", selectedImage);
    }, [selectedImage]);


    
    // Handlers to update state based on user selection
    const handleModelSelect = (model) => { //Selection between Mobilnetv2, VGG16, Resnet
      setSelectedModel(model);
    };
  
    const handleAttackSelect = (attack) => { //WhiteBox vs BlackBox
      setSelectedAttack(attack);
    };
  
    const handleTargetSelect = (target) => { //Targeted vs UnTargeted
      setSelectedTarget(target);
    }

    const renderSidePanels = () => {
        if (selectedAttack === 'blackboxattack' && selectedModel!=="") 
          {
            if (selectedTarget === 'targeted') 
              {
                return <BlackBoxParamerterPanelTargeted changePerturbation={handlePerturbaion} changeImg={handleImage} changeAttack={handleSetAttack} changeTargetImg = {handleTargetImage} changeSteps = {handleSteps} changeAlpha={handleAlpha} changeConfidence = {handleConfidence} changeLearningRate = {handleLearningRate} changeLangrangeMul = {handleLangrangeMul} changeIterations = {handleIterations}/>;
              }
            else if (selectedTarget === 'untargeted') 
              {
            // return <WhiteBoxParamerterPanel changePerturbation={handlePerturbaion} changeImg={handleImage} changeAttack={handleSetAttack}/>;
              }
          } 
        else if (selectedAttack === 'whiteboxattack' && selectedModel!=="" && selectedTarget !== "") 
          {
            return <WhiteBoxParamerterPanelTargeted changePerturbation={handlePerturbaion} changeImg={handleImage} changeAttack={handleSetAttack} changeTargetImg = {handleTargetImage} changeSteps = {handleSteps} changeAlpha={handleAlpha} changeConfidence = {handleConfidence} changeLearningRate = {handleLearningRate} changeLangrangeMul = {handleLangrangeMul} changeIterations = {handleIterations} target_untarget = {selectedTarget}/>;
          } 
      };
    
      const renderResults = () => {
        if(selectedImage==='')
        {
          return <></>
        }
        else
        {
          return <RenderResultsComponent model={selectedModel} attack={selectedAttack} target={selectedTarget} attack_name={attackMethod} image={selectedImage} targetImg ={selectedTargetImage} perturbation ={selectedPerturbation} steps={selectedSteps} alpha={selectedAlpha} learningRate= {selectedLearningRate} langrangeMul={selectedLangrangeMul} confidence={selectedConfidence} iterations={selectedIterations}/>
        }
      }

      

  return (
    <>
      <div id="home-page-wrapper-div">
        <div id="home-navbar-div">
          <div id="home-navbar-logo-div">
            <img src={whitelogo} alt="Red Logo" />
          </div>
          <div id="home-navbar-heading-div">
            Understanding Adversarial Attacks on Neural Network
          </div>
          <div id="home-navbar-navigation-div">
            
          </div>
        </div>
        <div id="home-selection-panel-div">
          <div id="Model-Selection-dropdown">
            <div className= {selectedModel===""?"dropdown":"dropdown selected"}>
              <button className="dropdown-button">{selectedModel===""?"Model":selectedModel==="vgg16"?"VGG16":"ResNet"}</button>
              <div className="dropdown-content">
                {/* <button className={selectedModel==="mobilenet" ?"highlight":""} onClick={() => handleModelSelect('mobilenet')}>MobileNet</button>  */}
                <button className={selectedModel==="vgg16" ?"highlight":""} onClick={() => handleModelSelect('vgg16')}>VGG16</button>
                {/* <button className={selectedModel==="vgg19" ?"highlight":""} onClick={() => handleModelSelect('vgg19')}>VGG19</button> */}
                <button className={selectedModel==="resnet" ?"highlight":""} onClick={() => handleModelSelect('resnet')}>ResNet</button>
              </div>
            </div>
          </div>
          <div id="Type-of-Attack-dropdown">
          <div className= {selectedAttack===""?"dropdown":"dropdown selected"}>
              <button className="dropdown-button">{selectedAttack===""?"Type of Attack":selectedAttack==="whiteboxattack"?"White Box Attack":"Black Box Attack"}</button>
              <div className="dropdown-content">
                <button className={selectedAttack==="whiteboxattack" ?"highlight":""} onClick={() => handleAttackSelect('whiteboxattack')}>White Box Attack</button>
                <button className={selectedAttack==="blackboxattack" ?"highlight":""}onClick={() => handleAttackSelect('blackboxattack')}>Black Box Attack</button>
                {/* <a href="#link3">Link 3</a> */}
              </div>
            </div>
          </div>
          <div id="Targeted-Untargeted-dropdown">
          <div className= {selectedTarget===""?"dropdown":"dropdown selected"}>
              <button className="dropdown-button">{selectedTarget===""?"Target":selectedTarget==="targeted"?"Targeted":"Untargeted"}</button>
              <div className="dropdown-content">
                <button className={selectedTarget==="targeted" ?"highlight":""} onClick={() => handleTargetSelect('targeted')}>Targeted</button>
                <button className={selectedTarget==="untargeted" ?"highlight":""} onClick={() => handleTargetSelect('untargeted')}>Untargeted</button>
                {/* <a href="#link3">Link 3</a> */}
              </div>
            </div>
          </div>
        </div>
        <div id="home-main-div">
          <div id="home-side-parameter-panel-div">
          {renderSidePanels()}
          </div>
          <div id="home-result-section-div">
            <div id="Render-Results">
                {renderResults()}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
