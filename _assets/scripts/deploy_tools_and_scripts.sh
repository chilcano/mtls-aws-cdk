# Disable pointless daemons
systemctl stop snapd snapd.socket lxcfs snap.amazon-ssm-agent.amazon-ssm-agent
systemctl disable snapd snapd.socket lxcfs snap.amazon-ssm-agent.amazon-ssm-agent

printf "==> Installing utilities and CLIs: git, awscli, curl, jq, unzip, software-properties-common (apt-add-repository) and sudo \n"
apt -yqq update
apt -yqq upgrade
DEBIAN_FRONTEND=noninteractive apt install -yqq git awscli curl jq unzip software-properties-common sudo apt-transport-https

printf "==> Installing DevOps tools \n"
DIR_PROJECT="$HOME/playground"

mkdir -p $DIR_PROJECT
wget -q https://github.com/chilcano/how-tos/blob/main/src/devops_tools_install_v3.sh
chmod +x devops_tools_install_v3.sh
mv devops_tools_install_v3.sh $DIR_PROJECT/.

git clone https://github.com/chilcano/mtls-apps-examples $DIR_PROJECT/mtls-apps-examples/

printf "==> Installation completed !! <== \n"