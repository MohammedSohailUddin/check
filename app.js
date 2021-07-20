
    const topics=[];
    const form = document.querySelector('form');
    form.addEventListener('submit',handleForm);
    const addContentTemplate =`<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="validationDefault02">Text</label>
        <input type="text" class="form-control" name="text" id="text" placeholder="Text" required>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationDefault03">text alt ( seperate by ';' )</label>
      <input type="text" class="form-control" name="text_alt" id="text_alt"  placeholder="text_alt" required>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationDefault04">Question</label>
      <input type="text" class="form-control" name="question" id="question" placeholder="Question" required>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
        <label for="validationDefault05">Alt Questions</label>
        <input type="text" class="form-control" name="alt_questions" id="alt_questions"  placeholder="Alt Questions" required>
      </div>
      
    <div class="col-md-6 mb-3">
        <label for="validationDefault05">Keywords</label>
        <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Keywords" required>
      </div>
  </div>`
    const topicSection = document.querySelector('.add_Topics');
    const content_Icon = document.querySelectorAll('.content_Icon');
    content_Icon.forEach(cnt=> cnt.addEventListener('click',addContent));

    function addContent(){
            const contentSection = document.querySelector('.contents');
            let div = document.createElement('div');
            div.classList.add('content')
            div.innerHTML =addContentTemplate;
            contentSection.appendChild(div)
    }
    
    function handleForm(e){

        e.preventDefault();
        const val= e.target;
        let contents=[];
        let topics =[];

        const unit_name = val.unit_Name.value;
        const topic_name= val.topic_Name.value;
        const header = val.header.value;
        const text = document.querySelectorAll('#text');
        const text_alt = document.querySelectorAll('#text_alt');

        const question = document.querySelectorAll('#question');
        const alt_questions= document.querySelectorAll('#alt_questions');
        const keywords = document.querySelectorAll('#keywords');


        const contentsQuery = document.querySelectorAll('.content');

        for (i=0; i<contentsQuery.length; i++){
            contents[i]={
                paragraph_id: i+1,
                text:text[i].value,
                text_alt:text_alt[i].value.split(';'),
                question:question[i].value,
                alt_questions:alt_questions[i].value.split(';'),
                keywords:keywords[i].value.split(';')
            }
        }
        const topic={
            topic_name,contents
        }

        topics.push(topic);

        const JSONobj={
            unit_name,header,topics
        }
        

        fetch('http://127.0.0.1:8080/handleForm',{
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(JSONobj),
        })
        .then(data => {
            alert('success');
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
