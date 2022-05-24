#만들어진 node이미지 사용, 노드16버전에 alpine 최소단위의 리눅스 버전
#사용할 베이스 이미지
FROM node:16-alpine 

#컨테이너 안에 어떤 경로에 실행할 것인지// cd와 같은 명령 
WORKDIR /app

#데이터를 카피한다음 
COPY package.json package-lock.json ./

# ci를 사용하면 lock.json에 버전 그대로 받음 
# RUN npm install
RUN npm ci 

COPY server.js .

#노드를 실행하고 저 파일을 실행한다.
ENTRYPOINT [ "node", "server.js" ]


#빈번할수록 마지막에 작성 <이미지 만드는 시간 단축 위해>



#이미지 생성 명령: docker build -f Dockerfile -t fun-docker .
#. : build context -> 명령어를 수행하는 현재 경로를 지정해줌  
#f: 어떤 도커파일을 사용할건지  
#t: 이름을 지정    

#도커 실행 명령: docker run -d -p 8080:8080 fun-docker
#d: detached 백그라운드 동작 
#p: 컨테이너 port 지정  뒤에번호 

#도커 실행 확인: docker ps 

#도커 이미지 이름 변경: docker tag fun-docker:latest aaddss639/letbeceo_server:latest

#도커 로그인: docker login 

#도커 이미지 푸시: docker push aaddss639/docker-example:latest

# 컨테이너 ID 값으로 삭제
# docker rm [CONTAINER_ID]





#aws에서 도커쓰는법 
#도커 설치: sudo yum install docker -y
# #도커 이미지 풀:  docker pull aaddss639/docker-example:latest 
#도커 로그인: docker login
#도커 실행: sudo systemctl start docker   /  sudo systemctl enable docker
#도커 docker.sock 파일 권한 666: sudo chmod 666 /var/run/docker.sock
