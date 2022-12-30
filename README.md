# Viridium 

## Introduction


## Install

#### Install brew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> ~/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### Install Node
brew install node

#### Java and Maven
brew install maven
brew install mysql

brew install openjdk@11
sudo ln -sfn /opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk
echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc

## Build and Run

```
https://github.com/viridium-ai

mkdir -p ~/github/viridium-ai

cd ~/github/viridium-ai

git clone https://github.com/viridium-ai/viridium-ui.git

cd viridium-ui

npm install

npm start

http://localhost:3000/carbon/dashboard

```
## Development



