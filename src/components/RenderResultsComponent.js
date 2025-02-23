import React,{useState} from 'react'
import '../static/css/RenderResultsComponent.css'
import AnalyticsFgsm from './AnalyticsFgsm';
import TransitionDisplay from './TransitionDisplay';


export default function RenderResultsComponent(props) {
    
      // How it is being called from Home.js
      // return <RenderResultsComponent model={selectedModel} attack={selectedAttack} target={selectedTarget} attack_name={attackMethod} image={selectedImage} targetImg ={selectedTargetImage} perturbation ={selectedPerturbation} steps={selectedSteps}/> 
      
    var [imageTimestamp, setImageTimestamp] = useState(Date.now());
    var fallbackModel = props.model || 'mobilenet';
    var fallbackAttack = props.attack || 'whiteboxattack';
    var fallbackTarget = props.target || 'untargeted';
    var fallbackAttackName = props.attack_name || 'fgsm';
    var fallbackPerturbation = props.perturbation || '0.15';
    var fallbackImage = props.image || 'puppy';
    var fallbackSteps = props.steps;
    var fallbackAlpha = props.alpha;
    var fallbackConfidence = props.confidence;
    var fallbackLangrangeMul = props.langrangeMul;
    var fallbackIterations = props.iterations;

    // Keep track of which section to show: 1 (Results & Analytics), 2 (Transition), 3 (iFrame)
      // By default, 1 is selected
      let [activeSection, setActiveSection] = useState(1);


    var filePath = '';
    var filePath_predicted = '';
    var filePath_adversarial = '';
    var adversarial_json_filePath = '';
    var original_json_filePath = '';
    var tsne_html = '';
    var tsne_html_2d = '';
    var firstImage_saliency = '';
    var lastImage_saliency = '';
    var videoSrc_saliency= '';
    var firstImage_gradCAM = '';
    var lastImage_gradCAM = '';
    var videoSrc_gradCAM = '';
    if(fallbackAttackName=== 'fgsm')
    {
      if (fallbackTarget === "untargeted") {
        filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}`;

        adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/results/adversarial_image_predictions.json`;

        original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/results/original_image_predictions.json`;

        tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;

        tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;
      }
      else
      {
        fallbackImage=props.image+'-'+props.targetImg;
        filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}`;


        adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/results/adversarial_image_predictions.json`;

        original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/results/original_image_predictions.json`;

        tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;

        tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;
      }
      
    }

    if(fallbackAttackName=== 'pgd')
    {
      if(fallbackTarget==='targeted')
      {
        fallbackImage=props.image+'-'+props.targetImg;

        filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}`;
        console.log(filePath);

        adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/results/adversarial_image_predictions.json?`;

        original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/results/original_image_predictions.json?`;

        tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;

        tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;

        firstImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/predicted_image_Saliency.jpg?${imageTimestamp}`;

        lastImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/adversarial_image_Saliency.jpg?${imageTimestamp}`;

        videoSrc_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/saliency_animation_sorted.mp4`;

        firstImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/predicted_image_gradCam.jpg?${imageTimestamp}`;

        lastImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/adversarial_image_gradCam.jpg?${imageTimestamp}`;

        videoSrc_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/gradcam_animation_sorted.mp4?${imageTimestamp}`;

      }
      if(fallbackTarget==='untargeted')
        {
          fallbackImage=props.image;
  
          filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}`;
          console.log(filePath);


          adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/results/adversarial_image_predictions.json?`;
  
          original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/results/original_image_predictions.json?`;
  
          tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;
  
          tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;
  
          firstImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/predicted_image_Saliency.jpg?${imageTimestamp}`;
  
          lastImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/adversarial_image_Saliency.jpg?${imageTimestamp}`;
  
          videoSrc_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/saliency_animation_sorted.mp4`;
  
          firstImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/predicted_image_gradCam.jpg?${imageTimestamp}`;
  
          lastImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/adversarial_image_gradCam.jpg?${imageTimestamp}`;
  
          videoSrc_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackPerturbation}/${fallbackSteps}/${fallbackAlpha}/${fallbackImage}/gradcam_animation_sorted.mp4?${imageTimestamp}`;
  
        }
    }

    if(fallbackAttackName=== 'cw')
      {
        if(fallbackTarget==='targeted')
        {
          fallbackImage=props.image+'-'+props.targetImg;
  
          filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}`;
          console.log(filePath);


  
          adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/results/adversarial_image_predictions.json?`;
  
          original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/results/original_image_predictions.json?`;
  
          tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;
  
          tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;
  
          firstImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/predicted_image_Saliency.png?${imageTimestamp}`;
  
          lastImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/adversarial_image_Saliency.png?${imageTimestamp}`;
  
          videoSrc_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/saliency_animation_sorted.mp4`;
  
          firstImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/predicted_image_gradCam.png?${imageTimestamp}`;
  
          lastImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/adversarial_image_gradCam.png?${imageTimestamp}`;
  
          videoSrc_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/gradcam_animation_sorted.mp4?${imageTimestamp}`;
  
        }
        //cw untargeted
        if(fallbackTarget==='untargeted')
          {
            fallbackImage=props.image;
    
            filePath_predicted = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/predicted_image.png?${imageTimestamp}`;
            console.log(filePath);
    
            adversarial_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/results/adversarial_image_predictions.json?`;
    
            original_json_filePath = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/results/original_image_predictions.json?`;
    
            tsne_html = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/tsne_3d_minimal.html?${imageTimestamp}`;
    
            tsne_html_2d = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/tsne_2d_minimal.html?${imageTimestamp}`;
    
            firstImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/predicted_image_Saliency.png?${imageTimestamp}`;
    
            lastImage_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/adversarial_image_Saliency.png?${imageTimestamp}`;
    
            videoSrc_saliency = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/saliency_animation_sorted.mp4`;
    
            firstImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/predicted_image_gradCam.png?${imageTimestamp}`;
    
            lastImage_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/adversarial_image_gradCam.png?${imageTimestamp}`;
    
            videoSrc_gradCAM = `${process.env.PUBLIC_URL}/images/${fallbackModel}/${fallbackAttack}/${fallbackTarget}/${fallbackAttackName}/${fallbackConfidence}/${fallbackLangrangeMul}/${fallbackIterations}/${fallbackImage}/gradcam_animation_sorted.mp4?${imageTimestamp}`;
    
          }
      }

    const renderButtons = (() => {
      if (fallbackAttackName === "fgsm") {
        return (
          <div style={{ boxSizing:'border-box', width: '100%',flexDirection: 'row', bottom: '0px', marginTop: '2px', display: 'flex' }}>
          <button className={activeSection===1?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(1)}>Results & Analytics</button>
          {/* <button className={activeSection===2?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(2)}>Transition (Saliency)</button>
          <button className={activeSection===3?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(3)}>Transition (GradCAM)</button> */}
          <button className={activeSection===4?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(4)}>TSNE (3D)</button>
          <button className={activeSection===5?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(5)}>TSNE (2D)</button>
        </div>
        );
      } else {
        return (
          <div style={{ boxSizing:'border-box', width: '100%',flexDirection: 'row', bottom: '0px', marginTop: '2px', display: 'flex' }}>
          <button className={activeSection===1?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(1)}>Results & Analytics</button>
          <button className={activeSection===2?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(2)}>Transition (Saliency)</button>
          <button className={activeSection===3?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(3)}>Transition (GradCAM)</button>
          <button className={activeSection===4?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(4)}>TSNE (3D)</button>
          <button className={activeSection===5?"fgsm-title selected":"fgsm-title"} style={{ margin: "2px", fontSize: "15px", width: "100%" }} onClick={() => setActiveSection(5)}>TSNE (2D)</button>
        </div>
        );
      }
    })();



  return (
    <>

      <div id="Render-Result-Page-Wrapper-div">
        {/* ---- SECTION BUTTONS ---- */}
        <div id="Render-Results-Buttons">
          {renderButtons}
        </div>
      

      {activeSection === 1 && (
        <>
        <div id="FGSM-Result-Section-div">
          <div id="FGSM-True-Result-div">
            <div className="fgsm-title">True Results</div>
            <div className="fgsm-image-gallery">
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  Original Image
                </div>
                <img
                  // src={`${filePath}/predicted_image.jpg?${imageTimestamp}`}
                  src={`${filePath}/predicted_image.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  Original Grad-CAM
                </div>
                <img
                  // src={`${filePath}/predicted_image_gradCam.jpg?${imageTimestamp}`}
                  src={`${filePath}/predicted_image_gradCam.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  Original Saliency Map
                </div>
                <img
                  // src={`${filePath}/predicted_image_Saliency.jpg?${imageTimestamp}`}
                  src={`${filePath}/predicted_image_Saliency.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </div>
          {/* True-Result-div Ends */}
          <div id="FGSM-Predicted-Result-div">
            <div className="fgsm-title">Adversarial Results</div>
            <div className="fgsm-image-gallery">
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  {" "}
                  Adversarial Image
                </div>
                <img
                  // src={`${filePath}/adversarial_image.jpg?${imageTimestamp}`}
                  src={`${filePath}/adversarial_image.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  {" "}
                  Adversarial Grad-CAM
                </div>
                <img
                  // src={`${filePath}/adversarial_image_gradCam.jpg?${imageTimestamp}`}
                  src={`${filePath}/adversarial_image_gradCam.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="fgsm-title"
                  style={{ margin: "2px", fontSize: "15px", width: "100%" }}
                >
                  {" "}
                  Adversarial Saliency Map
                </div>
                <img
                  // src={`${filePath}/adversarial_image_Saliency.jpg?${imageTimestamp}`}
                  src={`${filePath}/adversarial_image_Saliency.${fallbackAttackName === "cw" ? "png" : "jpg"}?${imageTimestamp}`}
                  alt="Predicted"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Predicted-Result-div */}
        </div>

        
        {/* // Analytics Section */}
        <div id="FGSM-Analytics-Section-div">
          <AnalyticsFgsm 
          key={`${original_json_filePath}-${adversarial_json_filePath}`}
          original_json_filePath ={original_json_filePath} 
          adversarial_json_filePath={adversarial_json_filePath}/>
        </div>
        </>
      )} 
      {/* Session1 ends here */}



      {/* ------------------------ */}
      {/* 2) Transition Section */}
      {/* ------------------------ */}
      {activeSection === 2 && (
      <div style={{boxSizing:'border-box', width: '100%',flexDirection: 'column', bottom: '0px', marginTop: '2px', display: 'flex' }}>
        <TransitionDisplay 
          key={`${firstImage_saliency}-${videoSrc_saliency}-${lastImage_saliency}`}
            firstImage={firstImage_saliency}
            videoSrc={videoSrc_saliency}
            lastImage={lastImage_saliency}
        />
      </div>
      )}

      {activeSection === 3 && (
      <div style={{boxSizing:'border-box', width: '100%',flexDirection: 'column', bottom: '0px', marginTop: '2px', display: 'flex' }}>
        <TransitionDisplay 
            key={`${firstImage_gradCAM}-${videoSrc_gradCAM}-${lastImage_gradCAM}`}
            firstImage={firstImage_gradCAM}
            videoSrc={videoSrc_gradCAM}
            lastImage={lastImage_gradCAM}
        />
      </div>
      )}

      {/* iframe Section */}
      {activeSection === 4 && (
      <div>
          <iframe 
              src={tsne_html} 
              width="100%" 
              height="650px" 
              style={{ border: 'none' }}
          />
      </div>
      )}

      {/* iframe Section */}
      {activeSection === 5 && (
      <div>
          <iframe 
              src={tsne_html_2d} 
              width="100%" 
              height="650px" 
              style={{ border: 'none' }}
          />
      </div>
      )}


        

      </div>
    </>
  );
}